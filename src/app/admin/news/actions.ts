// src/app/admin/news/actions.ts

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createNews, updateNews, deleteNews } from '@/server/services/news.service';

const upsertSchema = z.object({
  id: z.coerce.number().optional(),
  slug: z.string().min(2, 'Slug requis'),
  title: z.string().min(2, 'Titre requis'),
  description: z.string().min(5, 'Description trop courte'),
  source: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined),
  url: z
    .string()
    .url()
    .optional()
    .or(z.literal(''))
    .transform((v) => v || undefined),
  displayDate: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined),
  isPublished: z.coerce.boolean().optional().default(false),
  coverImage: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : null)),
});

export async function upsertNewsAction(formData: FormData) {
  const parsed = upsertSchema.parse({
    id: formData.get('id') ?? undefined,
    slug: formData.get('slug'),
    title: formData.get('title'),
    description: formData.get('description'),
    source: formData.get('source'),
    url: formData.get('url'),
    displayDate: formData.get('displayDate'),
    isPublished: formData.get('isPublished'), // checkbox -> on / undefined
    coverImage: formData.get('coverImage'),
  });

  // normalisations nullables
  const payload = {
    slug: parsed.slug,
    title: parsed.title,
    description: parsed.description,
    source: parsed.source ?? null,
    url: (parsed.url ?? undefined) ? parsed.url : null,
    displayDate: parsed.displayDate ?? null,
    isPublished: parsed.isPublished ?? false,
    coverImage: parsed.coverImage ?? null,
  };

  if (parsed.id) {
    await updateNews(parsed.id, payload);
  } else {
    await createNews(payload);
  }

  revalidatePath('/admin/actualites');
}

export async function deleteNewsAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isFinite(id)) throw new Error('INVALID_ID');
  await deleteNews(id);
  revalidatePath('/admin/actualites');
}
