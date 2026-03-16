import { supabase } from "@/lib/supabaseClient";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export const revalidate = 60; // ISR: revalidate every 60 seconds

const CATEGORY_COLORS: Record<string, string> = {
  General: "bg-blue-100 text-blue-700",
  Implants: "bg-purple-100 text-purple-700",
  Orthodontics: "bg-pink-100 text-pink-700",
  Cosmetic: "bg-amber-100 text-amber-700",
  Pediatric: "bg-green-100 text-green-700",
  Emergency: "bg-red-100 text-red-700",
  Hygiene: "bg-teal-100 text-teal-700",
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || "bg-slate-100 text-slate-700";
}

function stripMarkdown(content: string, maxLength: number): string {
  return content.replace(/[#*`\[\]]/g, "").slice(0, maxLength);
}

async function getBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const [featured, ...rest] = blogs;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <BookOpen size={16} className="text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Dental Blog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Expert Dental
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Insights & Tips
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Stay informed with the latest in dental health, treatment innovations,
            and expert advice from our team of specialists.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-slate-200 mb-4" />
            <h2 className="text-2xl font-bold text-slate-400">No articles yet</h2>
            <p className="text-slate-400 mt-2">
              Check back soon for expert dental insights.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <div className="mb-12">
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image */}
                      <div className="relative h-64 lg:h-96">
                        {featured.image_url ? (
                          <Image
                            src={featured.image_url}
                            alt={featured.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <BookOpen size={64} className="text-blue-300" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            Featured
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryColor(featured.category)}`}
                        >
                          {featured.category}
                        </span>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors leading-tight">
                          {featured.title}
                        </h2>
                        <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                          {stripMarkdown(featured.content, 250)}...
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <User size={14} />
                              {featured.author}
                            </span>
                            {featured.published_at && (
                              <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {formatDate(featured.published_at)}
                              </span>
                            )}
                          </div>
                          <span className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Article Grid */}
            {rest.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  More Articles
                </h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {rest.map((blog) => (
                    <div key={blog.id} className="break-inside-avoid">
                      <Link href={`/blog/${blog.slug}`} className="group block">
                        <article className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          {blog.image_url && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={blog.image_url}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${getCategoryColor(blog.category)}`}
                            >
                              {blog.category}
                            </span>
                            <h3 className="font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-4">
                              {stripMarkdown(blog.content, 180)}...
                            </p>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <User size={11} />
                                  {blog.author}
                                </span>
                                {blog.published_at && (
                                  <span className="flex items-center gap-1">
                                    <Calendar size={11} />
                                    {formatDate(blog.published_at)}
                                  </span>
                                )}
                              </div>
                              <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                                Read
                                <ArrowRight size={12} />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
