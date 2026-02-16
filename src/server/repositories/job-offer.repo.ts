// src/server/repositories/job-offer.repo.ts

import { prisma } from '@/lib/prisma';

export const jobOfferRepo = {
  create(data: {
    slug: string;
    title: string;
    location: string;
    contractType: string;
    description: string;
    publishedAt?: Date;
  }) {
    return prisma.jobOffer.create({
      data: {
        ...data,
        publishedAt: data.publishedAt ?? new Date(),
      },
    });
  },

  update(
    id: number,
    data: Partial<{
      slug: string;
      title: string;
      location: string;
      contractType: string;
      description: string;
      publishedAt: Date;
      // + champs optionnels si tu veux
    }>
  ) {
    return prisma.jobOffer.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.jobOffer.delete({ where: { id } });
  },

  list() {
    return prisma.jobOffer.findMany({ orderBy: { publishedAt: 'desc' } });
  },

  findBySlug(slug: string) {
    return prisma.jobOffer.findUnique({ where: { slug } });
  },

  findById(id: number) {
    return prisma.jobOffer.findUnique({
      where: { id },
    });
  },

  remove(id: number) {
    return prisma.jobOffer.delete({
      where: { id },
    });
  },
};
