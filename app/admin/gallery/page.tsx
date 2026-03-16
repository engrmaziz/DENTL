"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, Plus, Trash2, Upload, Tag, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { GalleryItem, GalleryCategory } from "@/types/gallery";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";

const CATEGORIES: GalleryCategory[] = [
  "Veneers",
  "Invisalign",
  "Implants",
  "Whitening",
  "General",
  "Emergency",
  "Pediatric",
];

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    image_url: "",
    title: "",
    category: "General" as GalleryCategory,
    is_before_after: false,
  });
  const { toast } = useToast();

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast("Failed to load gallery", "error");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      toast("Failed to upload image", "error");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
    setNewItem((prev) => ({ ...prev, image_url: urlData.publicUrl }));
    toast("Image uploaded successfully", "success");
    setUploading(false);
  };

  const handleAddItem = async () => {
    if (!newItem.image_url || !newItem.title) {
      toast("Please provide an image and title", "error");
      return;
    }

    const { data, error } = await supabase
      .from("gallery")
      .insert([{ ...newItem, sort_order: items.length }])
      .select()
      .single();

    if (error) {
      toast("Failed to add gallery item", "error");
    } else {
      toast("Gallery item added successfully", "success");
      setItems((prev) => [...prev, data]);
      setNewItem({ image_url: "", title: "", category: "General", is_before_after: false });
      setShowAddForm(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    setDeletingId(id);

    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
      toast("Failed to delete item", "error");
    } else {
      toast("Item deleted successfully", "success");
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
    setDeletingId(null);
  };

  const filtered =
    selectedCategory === "All"
      ? items
      : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your smile gallery images
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchGallery}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
          >
            <Plus size={16} />
            Add Image
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border border-slate-200 p-6"
          >
            <h3 className="font-semibold text-slate-900 mb-4">Add New Image</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors bg-slate-50">
                  {uploading ? (
                    <RefreshCw size={24} className="text-blue-500 animate-spin" />
                  ) : newItem.image_url ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={newItem.image_url}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="text-slate-400 mb-2" />
                      <span className="text-sm text-slate-500">Click to upload</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="text-xs text-slate-400 mt-1">Or paste a URL below</p>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newItem.image_url}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, image_url: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Meta */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Smile Makeover"
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        category: e.target.value as GalleryCategory,
                      }))
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
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newItem.is_before_after}
                    onChange={(e) =>
                      setNewItem((prev) => ({
                        ...prev,
                        is_before_after: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-slate-700">Before/After image</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddItem}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
              >
                Add to Gallery
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
          <Images size={48} className="mx-auto mb-4 text-slate-200" />
          <p className="text-slate-400 font-medium">No images in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200"
              >
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end">
                  <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="flex items-center gap-1 text-white/70 text-xs">
                        <Tag size={10} />
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {item.is_before_after && (
                  <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                    B/A
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
