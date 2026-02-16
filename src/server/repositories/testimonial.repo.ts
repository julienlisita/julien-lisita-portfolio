// src/server/repositories/testimonial.repo.ts

import { prisma } from '@/lib/prisma';
import { Prisma, Testimonial } from '@prisma/client';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const testimonialRepo = {
  // Liste complète pour l’admin : publiés en premier, puis highlight, puis récents
  listAll(): Promise<Testimonial[]> {
    return prisma.testimonial.findMany({
      orderBy: [{ isPublished: 'desc' }, { highlight: 'desc' }, { publishedAt: 'desc' }],
    });
  },

  // Option si tu veux afficher seulement les publiés côté public
  listPublished(): Promise<Testimonial[]> {
    return prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: [{ highlight: 'desc' }, { publishedAt: 'desc' }],
    });
  },

  findById(id: number): Promise<Testimonial | null> {
    return prisma.testimonial.findUnique({ where: { id } });
  },

  // Créations publiques (si tu as un formulaire public)
  createFromPublic(data: {
    name: string;
    quote: string;
    role?: string | null;
    company?: string | null;
    rating?: number | null;
    avatarUrl?: string | null;
    displayDate?: string | null;
    variant?: string | null;
  }): Promise<Testimonial> {
    return prisma.testimonial.create({
      data: {
        ...data,
        // On force l’état initial côté modération
        isPublished: false,
        publishedAt: null,
        // highlight peut rester à sa valeur par défaut Prisma si défini dans le schéma
      },
    });
  },

  // Édition légère par l’admin
  update(
    id: number,
    data: Partial<{
      name: string;
      role: string | null;
      company: string | null;
      quote: string;
      rating: number | null; // Prisma Decimal accepte number
      avatarUrl: string | null;
      displayDate: string | null;
      variant: string | null;
      highlight: boolean;
    }>
  ): Promise<Testimonial> {
    // On normalise vers le type attendu par Prisma sans any
    const patch: Prisma.TestimonialUpdateInput = {};

    if (typeof data.name !== 'undefined') patch.name = data.name;
    if (typeof data.role !== 'undefined') patch.role = data.role;
    if (typeof data.company !== 'undefined') patch.company = data.company;
    if (typeof data.quote !== 'undefined') patch.quote = data.quote;
    if (typeof data.avatarUrl !== 'undefined') patch.avatarUrl = data.avatarUrl;
    if (typeof data.displayDate !== 'undefined') patch.displayDate = data.displayDate;
    if (typeof data.variant !== 'undefined') patch.variant = data.variant;
    if (typeof data.highlight !== 'undefined') patch.highlight = data.highlight;

    if (typeof data.rating !== 'undefined') {
      // clamp si fourni (accepte null)
      const value = data.rating;
      patch.rating = typeof value === 'number' ? clamp(value, 0, 5) : value; // number | null
    }

    return prisma.testimonial.update({ where: { id }, data: patch });
  },

  // Publication / dépublication
  publish(id: number): Promise<Testimonial> {
    return prisma.testimonial.update({
      where: { id },
      data: { isPublished: true, publishedAt: new Date() },
    });
  },

  unpublish(id: number): Promise<Testimonial> {
    return prisma.testimonial.update({
      where: { id },
      data: { isPublished: false, publishedAt: null },
    });
  },

  // Mise en avant
  setHighlight(id: number, value: boolean): Promise<Testimonial> {
    return prisma.testimonial.update({ where: { id }, data: { highlight: value } });
  },

  remove(id: number): Promise<Testimonial> {
    return prisma.testimonial.delete({ where: { id } });
  },
};
