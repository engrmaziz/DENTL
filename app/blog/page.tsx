import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";

export const metadata = {
  title: "Dental Blog",
  description: "Read the latest news, tips, and articles about dental health and oral care.",
};

const DUMMY_POSTS = [
  {
    id: "1",
    title: "10 Essential Tips for Maintaining a Healthy Smile",
    slug: "10-essential-tips-healthy-smile",
    excerpt: "Discover the daily habits that can significantly improve your oral health and keep your teeth shining bright.",
    author: "Dr. Sarah Smith",
    cover_image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800&h=500",
    published_at: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    title: "Understanding the Benefits of Clear Aligners",
    slug: "understanding-benefits-clear-aligners",
    excerpt: "Clear aligners have revolutionized orthodontics. Learn why more adults are choosing this invisible treatment.",
    author: "Dr. Michael Chen",
    cover_image: "https://images.unsplash.com/photo-1590625691060-e83ee91e84e1?auto=format&fit=crop&q=80&w=800&h=500",
    published_at: "2024-03-10T14:30:00Z"
  },
  {
    id: "3",
    title: "What Happens During a Root Canal Procedure?",
    slug: "what-happens-during-root-canal",
    excerpt: "Demystifying the most misunderstood dental procedure. Find out why a root canal is actually your tooth's best friend.",
    author: "Dr. Emily Davis",
    cover_image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800&h=500",
    published_at: "2024-03-05T09:15:00Z"
  }
];

export default function BlogPage() {
  // In a real application, you'd fetch this from Supabase
  const posts = DUMMY_POSTS;

  return (
    <div className="pt-20">
      <div className="bg-slate-50 py-20 border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Our Dental Blog</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Oral health tips, clinic news, and insights from our team of dental experts.
          </p>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-slate-100">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.published_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-primary font-semibold text-sm hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                    Read Article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
