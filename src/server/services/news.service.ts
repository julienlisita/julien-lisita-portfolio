// src/server/services/news.service.ts

import { newsRepo } from '../repositories/news.repo';
import type { Prisma } from '@prisma/client';

export const listNews = () => newsRepo.list();
export const getNews = (id: number) => newsRepo.findById(id);

export function createNews(
  input: Omit<Prisma.NewsItemCreateInput, 'publishedAt'> & { publishedAt?: Date }
) {
  return newsRepo.create({ ...input, publishedAt: input.publishedAt ?? new Date() });
}

export function updateNews(id: number, data: Prisma.NewsItemUpdateInput) {
  return newsRepo.update(id, data);
}

export const deleteNews = (id: number) => newsRepo.remove(id);

// Option lisibilité: alias "public"
export const listPublicNews = listNews;
