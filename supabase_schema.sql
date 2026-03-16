-- Supabase SQL Schema for Premium Dental SaaS Platform

-- ============================================================
-- 1. APPOINTMENTS TABLE (updated)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.appointments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    preferred_date date NOT NULL,
    preferred_time text NOT NULL,
    reason text NOT NULL,
    google_event_id text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous appointment inserts" ON public.appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read appointments" ON public.appointments
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update appointments" ON public.appointments
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete appointments" ON public.appointments
    FOR DELETE USING (auth.role() = 'authenticated');


-- ============================================================
-- 2. BLOGS TABLE (rich content)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blogs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    content text NOT NULL,
    image_url text,
    category text NOT NULL DEFAULT 'General',
    author text NOT NULL DEFAULT 'Dr. Team',
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to blogs" ON public.blogs
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage blogs" ON public.blogs
    FOR ALL USING (auth.role() = 'authenticated');


-- ============================================================
-- 3. BLOG POSTS TABLE (legacy, keep for backward compat)
-- ============================================================
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

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to blog_posts" ON public.blog_posts
    FOR SELECT USING (true);


-- ============================================================
-- 4. DOCTORS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.doctors (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    role text NOT NULL,
    image_url text,
    bio text,
    specialties text[] DEFAULT '{}',
    availability jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to doctors" ON public.doctors
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage doctors" ON public.doctors
    FOR ALL USING (auth.role() = 'authenticated');


-- ============================================================
-- 5. GALLERY TABLE (metadata for gallery images)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.gallery (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url text NOT NULL,
    title text NOT NULL,
    category text NOT NULL DEFAULT 'General',
    is_before_after boolean DEFAULT false,
    sort_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to gallery" ON public.gallery
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage gallery" ON public.gallery
    FOR ALL USING (auth.role() = 'authenticated');


-- ============================================================
-- 6. CLINIC SETTINGS TABLE (key-value pairs)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.clinic_settings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    key text NOT NULL UNIQUE,
    value text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.clinic_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to clinic_settings" ON public.clinic_settings
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage clinic_settings" ON public.clinic_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Default clinic settings seed data
INSERT INTO public.clinic_settings (key, value) VALUES
    ('phone', '(123) 456-7890'),
    ('emergency_phone', '(123) 999-9999'),
    ('email', 'contact@premiumdental.com'),
    ('address', '123 Health Avenue, Medical District, New York, NY 10001'),
    ('hours_weekday', 'Mon-Fri: 8:00 AM - 7:00 PM'),
    ('hours_saturday', 'Sat: 9:00 AM - 4:00 PM'),
    ('hours_sunday', 'Sunday: 24/7 Emergencies Only'),
    ('open_time', '08:00'),
    ('close_time', '19:00')
ON CONFLICT (key) DO NOTHING;


-- ============================================================
-- 7. TESTIMONIALS TABLE (existing, keep)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review text NOT NULL,
    treatment text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to testimonials" ON public.testimonials
    FOR SELECT USING (true);


-- ============================================================
-- 8. STORAGE BUCKET FOR GALLERY IMAGES
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');
