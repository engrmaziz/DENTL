import { supabase } from "@/lib/supabaseClient";
import { Blog } from "@/types/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60;

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Article Not Found" };
  return {
    title: blog.title,
    description: blog.content.slice(0, 160),
  };
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogSlugPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      {blog.image_url && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
              <Tag size={13} />
              {blog.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-slate-500 pb-6 border-b border-slate-100">
            <span className="flex items-center gap-2">
              <User size={16} className="text-blue-500" />
              <span className="font-medium text-slate-700">{blog.author}</span>
            </span>
            {blog.published_at && (
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                {formatDate(blog.published_at)}
              </span>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-slate max-w-none">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
            {blog.content}
          </div>
        </article>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Transform Your Smile?</h3>
          <p className="text-blue-100 mb-6 text-sm">
            Book a consultation with our expert dental team today.
          </p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            Book Appointment
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
