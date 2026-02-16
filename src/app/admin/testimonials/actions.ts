// src/app/admin/testimonials/actions.ts

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {
  publishTestimonial,
  unpublishTestimonial,
  setTestimonialHighlight,
  updateTestimonial,
  deleteTestimonial,
} from '@/server/services/testimonials.service';

const updateSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(2),
  role: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  company: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  quote: z.string().min(5),
  rating: z
    .union([z.coerce.number(), z.null(), z.undefined()])
    .transform((v) => (typeof v === 'number' ? Math.max(0, Math.min(5, v)) : (v ?? null))),
  avatarUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal(''))
    .transform((v) => v || null),
  displayDate: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  variant: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || null),
  highlight: z.coerce.boolean().optional(),
});

const R = () => revalidatePath('/admin/temoignages');

export async function publishTestimonialAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isFinite(id)) throw new Error('INVALID_ID');
  await publishTestimonial(id);
  R();
}

export async function unpublishTestimonialAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isFinite(id)) throw new Error('INVALID_ID');
  await unpublishTestimonial(id);
  R();
}

export async function toggleHighlightAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const value = formData.get('value') === 'true';
  if (!Number.isFinite(id)) throw new Error('INVALID_ID');
  await setTestimonialHighlight(id, value);
  R();
}

export async function updateTestimonialAction(formData: FormData) {
  const parsed = updateSchema.parse({
    id: formData.get('id'),
    name: formData.get('name'),
    role: formData.get('role'),
    company: formData.get('company'),
    quote: formData.get('quote'),
    rating: formData.get('rating'),
    avatarUrl: formData.get('avatarUrl'),
    displayDate: formData.get('displayDate'),
    variant: formData.get('variant'),
    highlight: formData.get('highlight'),
  });
  await updateTestimonial(parsed.id, parsed);
  R();
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isFinite(id)) throw new Error('INVALID_ID');
  await deleteTestimonial(id);
  R();
}
