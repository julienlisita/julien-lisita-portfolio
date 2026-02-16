// src/app/(site)/contact/actions.ts

'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { sendContactAdminEmail } from '@/server/services/contact.mail';

const schema = z.object({
  civilite: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((v) => (typeof v === 'string' && v.trim() !== '' ? v : undefined)),
  prenom: z.string().min(1, 'Prénom requis'),
  nom: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Message trop court'),
  company: z.string().optional(), // honeypot
});

export async function sendContact(formData: FormData): Promise<void> {
  // Honeypot
  if (formData.get('company')) {
    console.warn('[sendContact] spam détecté via honeypot');
    redirect('/thank-you');
  }

  const parsed = schema.safeParse({
    civilite: formData.get('civilite'),
    prenom: formData.get('prenom'),
    nom: formData.get('nom'),
    email: formData.get('email'),
    message: formData.get('message'),
    company: formData.get('company'),
  });

  if (!parsed.success) {
    console.error('[sendContact] validation error', parsed.error.flatten());
    redirect('/contact?error=validation');
  }

  const data = parsed.data;

  try {
    await sendContactAdminEmail({
      civilite: data.civilite,
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      message: data.message,
    });
  } catch (err) {
    console.error('[sendContact] error while sending email', err);
  }

  redirect('/thank-you');
}
