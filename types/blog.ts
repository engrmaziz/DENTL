export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  cover_image?: string;
  published_at?: string;
  created_at?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url?: string;
  category: string;
  author: string;
  published_at?: string;
  created_at?: string;
}
