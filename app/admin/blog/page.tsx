"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  RefreshCw,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Blog } from "@/types/blog";
import { useToast } from "@/hooks/useToast";

const CATEGORIES = [
  "General",
  "Implants",
  "Orthodontics",
  "Cosmetic",
  "Pediatric",
  "Emergency",
  "Hygiene",
];

const emptyBlog: Omit<Blog, "id" | "created_at"> = {
  title: "",
  slug: "",
  content: "",
  image_url: "",
  category: "General",
  author: "Dr. Team",
  published_at: undefined,
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Blog, "id" | "created_at">>(emptyBlog);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast("Failed to load blog posts", "error");
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const startEdit = (blog: Blog) => {
    setEditing(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      image_url: blog.image_url || "",
      category: blog.category,
      author: blog.author,
      published_at: blog.published_at,
    });
    setIsAdding(false);
    setPreview(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditing(null);
    setFormData(emptyBlog);
    setPreview(false);
  };

  const cancelEdit = () => {
    setEditing(null);
    setIsAdding(false);
    setFormData(emptyBlog);
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handlePublish = (publish: boolean) => {
    setFormData((prev) => ({
      ...prev,
      published_at: publish ? new Date().toISOString() : undefined,
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content || !formData.slug) {
      toast("Title, slug, and content are required", "error");
      return;
    }

    setSaving(true);

    if (isAdding) {
      const { data, error } = await supabase
        .from("blogs")
        .insert([formData])
        .select()
        .single();

      if (error) {
        toast(`Failed to create post: ${error.message}`, "error");
      } else {
        toast("Blog post created!", "success");
        setBlogs((prev) => [data, ...prev]);
        cancelEdit();
      }
    } else if (editing) {
      const { data, error } = await supabase
        .from("blogs")
        .update(formData)
        .eq("id", editing.id)
        .select()
        .single();

      if (error) {
        toast(`Failed to update post: ${error.message}`, "error");
      } else {
        toast("Blog post updated!", "success");
        setBlogs((prev) => prev.map((b) => (b.id === editing.id ? data : b)));
        cancelEdit();
      }
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast("Failed to delete post", "error");
    } else {
      toast("Post deleted", "success");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const showForm = editing !== null || isAdding;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Write, edit, and publish dental articles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={startAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
          >
            <Plus size={16} />
            New Post
          </button>
        </div>
      </div>

      {/* Editor */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
          >
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900">
                {isAdding ? "New Article" : "Edit Article"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreview(!preview)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  {preview ? <EyeOff size={14} /> : <Eye size={14} />}
                  {preview ? "Edit" : "Preview"}
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Meta fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Article title..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="article-slug"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, author: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Content editor */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Content (Markdown) *
                </label>
                {preview ? (
                  <div className="min-h-64 p-4 border border-slate-200 rounded-xl bg-slate-50 prose prose-sm max-w-none text-slate-700">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {formData.content || "Nothing to preview"}
                    </pre>
                  </div>
                ) : (
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, content: e.target.value }))
                    }
                    rows={16}
                    placeholder="Write your article in Markdown format..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-blue-500 resize-y leading-relaxed"
                  />
                )}
              </div>

              {/* Publish controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePublish(!formData.published_at)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                      formData.published_at
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Calendar size={14} />
                    {formData.published_at ? "Published" : "Draft"}
                  </button>
                  {formData.published_at && (
                    <span className="text-xs text-slate-400">
                      {new Date(formData.published_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium"
                  >
                    {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? "Saving..." : "Save Post"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <FileText size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="text-slate-400 font-medium">No blog posts yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {blog.title}
                    </h3>
                    {blog.published_at ? (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="px-2 py-0.5 bg-slate-100 rounded-md">{blog.category}</span>
                    <span>by {blog.author}</span>
                    <span className="font-mono text-slate-400">/{blog.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(blog)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
