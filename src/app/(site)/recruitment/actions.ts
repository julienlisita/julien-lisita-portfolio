// src/app/(site)/recruitment/actions.ts

'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { sendApplicationAdminEmail } from '@/server/services/recruitment.mail';

const schema = z.object({
  civilite: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((v) => (typeof v === 'string' && v.trim() !== '' ? v : undefined)),
  prenom: z.string().min(1, 'Prénom requis'),
  nom: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(5, 'Message trop court'),
  company: z.string().optional(), // honeypot
});

async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString('base64');
}

// Optionnel: petite validation (5 Mo) côté server aussi
const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB
const allowedMime = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function sendApplication(jobTitle: string, formData: FormData): Promise<void> {
  // Honeypot
  if (formData.get('company')) {
    console.warn('[sendApplication] spam détecté via honeypot');
    redirect('/thank-you-application');
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
    console.error('[sendApplication] validation error', parsed.error.flatten());
    redirect('/recruitment?error=validation');
  }

  const data = parsed.data;

  const cv = formData.get('cv') as File | null;

  let attachments: Array<{ name: string; content: string }> = [];
  if (cv && cv.size > 0) {
    if (cv.size > MAX_CV_SIZE) {
      console.warn('[sendApplication] CV too large', cv.size);
      redirect('/recruitment?error=cv-too-large');
    }

    // Si FileUpload peut envoyer type vide selon navigateur, tu peux assouplir ce check
    if (cv.type && !allowedMime.has(cv.type)) {
      console.warn('[sendApplication] invalid CV mime type', cv.type);
      redirect('/recruitment?error=cv-invalid-type');
    }

    attachments = [{ name: cv.name, content: await fileToBase64(cv) }];
  }

  try {
    await sendApplicationAdminEmail({
      jobTitle,
      civilite: data.civilite,
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      message: data.message,
      attachments,
    });
  } catch (err) {
    console.error('[sendApplication] error while sending email', err);
    // on ne bloque pas l'UX
  }

  redirect('/thank-you-application');
}
