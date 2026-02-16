// src/types/testimonial.ts

export interface Testimonial {
  id: number;
  name: string;
  role?: string; // ex: “Cliente”, “CEO @ Acme”
  company?: string; // ex: “Compagnie Care Services”
  quote: string;
  rating?: number; // 1..5 (peut être décimal: 4.5 -> arrondi à .5 visuel)
  avatarUrl?: string; // optionnel: /images/clients/lesly.jpg
  displayDate?: string; // ex: “Août 2025”
  highlight?: boolean; // met la carte en avant
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
  publishedAt?: string; // ISO string si tu veux trier par date de publication
  isPublished?: boolean;
  city?: string;
}
