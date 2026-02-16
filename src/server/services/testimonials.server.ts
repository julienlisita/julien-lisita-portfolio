// src/services/testimonials.server.ts

import { IS_DB } from '@/config/dataMode';
import type { Testimonial } from '@/types/testimonial';
import { testimonials } from '@/data/testimonials';
import type { Prisma } from '@prisma/client';

function toNumber(
  v: number | Prisma.Decimal | null | undefined,
  fallback?: number
): number | undefined {
  if (v == null) return fallback;
  return typeof v === 'number' ? v : typeof v?.toNumber === 'function' ? v.toNumber() : fallback;
}

const isVariant = (v: unknown): v is NonNullable<Testimonial['variant']> =>
  v === 'default' || v === 'compact' || v === 'horizontal';

export async function getPublicTestimonialsServer(): Promise<ReadonlyArray<Testimonial>> {
  if (!IS_DB) return testimonials;

  const { listPublishedTestimonials } = await import('@/server/services/testimonials.service');
  const rows = await listPublishedTestimonials();

  // mapping vers le type front
  return rows.map(
    (r): Testimonial => ({
      id: r.id,
      name: r.name,
      role: r.role ?? undefined,
      company: r.company ?? undefined,
      quote: r.quote,
      rating: toNumber(r.rating, 5),
      avatarUrl: r.avatarUrl ?? undefined,
      displayDate: r.displayDate ?? undefined,
      highlight: r.highlight ?? false,
      variant: isVariant(r.variant) ? r.variant : 'default',
      isPublished: r.isPublished ?? true,
      publishedAt: r.publishedAt ? new Date(r.publishedAt).toISOString() : undefined,
    })
  );
}
