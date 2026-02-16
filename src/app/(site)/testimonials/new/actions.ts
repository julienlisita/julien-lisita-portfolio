// src/app/(site)/temoignages/nouveau/actions.ts

'use server';

import { z } from 'zod';
import { createTestimonialFromPublic } from '@/server/services/testimonials.service';

const schema = z.object({
  website: z.string().max(0).optional(),
  name: z.string().min(2, 'Nom trop court'),
  quote: z.string().min(10, 'Votre message est trop court'),
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
  rating: z
    .union([z.coerce.number(), z.null(), z.undefined()])
    .transform((v) => (typeof v === 'number' ? Math.max(0, Math.min(5, v)) : null)),
  avatarUrl: z
    .string()
    .url('URL invalide')
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
  consent: z
    .union([z.literal('on'), z.undefined(), z.null()])
    .refine((v) => v === 'on', { message: 'Consentement requis' }),
});

export type PublicTestimonialFormState = {
  ok?: boolean;
  errors?: Record<string, string[]>;
  values?: Record<string, string>;
  redirectTo?: string;
};

export async function submitTestimonialAction(
  _prevState: PublicTestimonialFormState | undefined,
  formData: FormData
): Promise<PublicTestimonialFormState> {
  const parsed = schema.safeParse({
    website: formData.get('website'),
    name: formData.get('name'),
    role: formData.get('role'),
    company: formData.get('company'),
    quote: formData.get('quote'),
    rating: formData.get('rating'),
    avatarUrl: formData.get('avatarUrl'),
    displayDate: formData.get('displayDate'),
    variant: formData.get('variant'),
    consent: formData.get('consent'),
  });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return {
      ok: false,
      errors: fieldErrors,
      values: Object.fromEntries(formData.entries()) as Record<string, string>,
    };
  }

  const v = parsed.data;
  await createTestimonialFromPublic({
    name: v.name,
    quote: v.quote,
    role: v.role ?? null,
    company: v.company ?? null,
    rating: v.rating ?? null,
    avatarUrl: v.avatarUrl ?? null,
    displayDate: v.displayDate ?? null,
    variant: v.variant ?? null,
  });

  return { ok: true, redirectTo: '/testimonials/merci' };
}
