// src/server/repositories/news.repo.ts

import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

export const newsRepo = {
  list() {
    return prisma.newsItem.findMany({ orderBy: { publishedAt: 'desc' } });
  },
  findById(id: number) {
    return prisma.newsItem.findUnique({ where: { id } });
  },
  create(data: Prisma.NewsItemCreateInput) {
    return prisma.newsItem.create({ data });
  },
  update(id: number, data: Prisma.NewsItemUpdateInput) {
    return prisma.newsItem.update({ where: { id }, data });
  },
  remove(id: number) {
    return prisma.newsItem.delete({ where: { id } });
  },
};
