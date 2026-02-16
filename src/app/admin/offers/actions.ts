// src/app/admin/offers/actions.ts

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
} from '@/server/services/job-offer.service';

const upsertSchema = z.object({
  id: z.coerce.number().optional(),
  slug: z.string().min(2, 'Slug requis'),
  title: z.string().min(2, 'Titre trop court'),
  location: z.string().min(2, 'Localisation requise'),
  contractType: z.string().min(2, 'Type de contrat requis'),
  description: z.string().min(5, 'Description trop courte'),
});

export async function upsertJobOfferAction(formData: FormData) {
  const parsed = upsertSchema.parse({
    id: formData.get('id') ?? undefined,
    slug: String(formData.get('slug') ?? ''),
    title: String(formData.get('title') ?? ''),
    location: String(formData.get('location') ?? ''),
    contractType: String(formData.get('contractType') ?? ''),
    description: String(formData.get('description') ?? ''),
  });

  if (parsed.id) {
    await updateJobOffer(parsed.id, {
      slug: parsed.slug,
      title: parsed.title,
      location: parsed.location,
      contractType: parsed.contractType,
      description: parsed.description,
    });
  } else {
    await createJobOffer({
      slug: parsed.slug,
      title: parsed.title,
      location: parsed.location,
      contractType: parsed.contractType,
      description: parsed.description,
    });
  }

  revalidatePath('/admin/offres');
}

export async function deleteJobOfferAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!Number.isFinite(id)) throw new Error('INVALID_ID');

  await deleteJobOffer(id);
  revalidatePath('/admin/offres');
}
