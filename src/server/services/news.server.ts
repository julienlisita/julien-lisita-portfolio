// src/services/news.server.ts

import { IS_DB } from '@/config/dataMode';
import type { NewsItem } from '@/types/news';
import { newsItems } from '@/data/news';

export async function getPublicNewsServer(): Promise<ReadonlyArray<NewsItem>> {
  if (!IS_DB) return newsItems;

  // Import conditionnel pour éviter de bundler Prisma en mode static/edge
  const { listPublicNews } = await import('@/server/services/news.service');
  const rows = await listPublicNews();

  return rows as unknown as NewsItem[];
}
