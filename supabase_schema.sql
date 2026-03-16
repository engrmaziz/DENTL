-- Supabase SQL Schema for Premium Dental SaaS Template

-- 1. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    preferred_date date NOT NULL,
    preferred_time text NOT NULL,
    reason text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can submit an appointment request)
CREATE POLICY "Allow anonymous appointment inserts" ON public.appointments
    FOR INSERT WITH CHECK (true);

-- Only authenticated admins can view appointments (requires setting up auth)
CREATE POLICY "Allow authenticated users to read appointments" ON public.appointments
    FOR SELECT USING (auth.role() = 'authenticated');


-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    content text NOT NULL,
    author text NOT NULL,
    cover_image text,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read blog posts
CREATE POLICY "Allow public read access to blog_posts" ON public.blog_posts
    FOR SELECT USING (true);


-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review text NOT NULL,
    treatment text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can read testimonials
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials
    FOR SELECT USING (true);


-- 4. Storage Bucket for Gallery
-- Note: Assuming storage component is installed in your Supabase project instance.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to gallery bucket
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery');

-- Allow authenticated users to upload to gallery bucket
CREATE POLICY "Authenticated users can upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');
