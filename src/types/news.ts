// src/types/news.ts

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  source?: string;
  url?: string;
  imageUrl?: string;
  imageAlt?: string;
  displayDate?: string;
  publishedAt?: string;
  isPublished?: boolean;
}
