export interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  category: GalleryCategory;
  is_before_after: boolean;
  sort_order: number;
  created_at?: string;
}

export type GalleryCategory =
  | 'Veneers'
  | 'Invisalign'
  | 'Implants'
  | 'Whitening'
  | 'General'
  | 'Emergency'
  | 'Pediatric';
