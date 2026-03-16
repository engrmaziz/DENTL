import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";

// Mock data to simulate Supabase fetch
const DUMMY_POST = {
  title: "10 Essential Tips for Maintaining a Healthy Smile",
  content: `
    <p>Maintaining a healthy smile goes beyond just brushing your teeth twice a day. Your oral health is a critical component of your overall health and well-being. Here are ten essential tips our experts recommend to keep your smile bright and your teeth strong.</p>
    
    <h3>1. Don't Go to Bed Without Brushing</h3>
    <p>It's no secret that the general recommendation is to brush at least twice a day. Still, many of us continue to neglect brushing our teeth at night. Brushing before bed gets rid of the germs and plaque that accumulate throughout the day.</p>
    
    <h3>2. Brush Properly</h3>
    <p>The way you brush is equally important—in fact, doing a poor job of brushing your teeth is almost as bad as not brushing at all. Take your time, moving the toothbrush in gentle, circular motions to remove plaque. Unremoved plaque can harden, leading to calculus buildup and gingivitis (early gum disease).</p>

    <h3>3. Don't Neglect Your Tongue</h3>
    <p>Plaque can also build up on your tongue. Not only can this lead to bad mouth odor, but it can lead to other oral health problems. Gently brush your tongue every time you brush your teeth.</p>

    <h3>4. Use a Fluoride Toothpaste</h3>
    <p>As for toothpaste, there are more important elements to look for than whitening power and flavors. No matter which version you choose, make sure it contains fluoride. While fluoride has come under scrutiny by those worried about how it impacts other areas of health, this substance remains a mainstay in oral health.</p>

    <h3>5. Treat Flossing as Important as Brushing</h3>
    <p>Many who brush regularly neglect to floss. Flossing is not just for getting those little pieces of Chinese food or broccoli that may be getting stuck in between your teeth. It's really a way to stimulate the gums, reduce plaque, and help lower inflammation in the area.</p>
  `,
  author: "Dr. Sarah Smith",
  cover_image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200&h=600",
  published_at: "2024-03-15T10:00:00Z"
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In a real app, fetch post by slug from Supabase
  return {
    title: DUMMY_POST.title,
    description: "Read the full article on our dental blog.",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the post using params.slug
  const post = DUMMY_POST;

  return (
    <div className="pt-20 bg-white">
      <article className="pb-24">
        {/* Cover Image */}
        <div className="w-full h-[400px] lg:h-[500px] relative bg-slate-100">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
                <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.published_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <div 
            className="prose prose-lg prose-slate prose-blue max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 
              prose-a:text-primary hover:prose-a:text-blue-700
              prose-img:rounded-2xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
