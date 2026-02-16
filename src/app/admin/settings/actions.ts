// src/app/admin/settings/actions.ts

'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { authCookieName } from '@/lib/auth-cookies';
import { userRepo } from '@/server/repositories/user.repo';

// Schéma pour changement de mot de passe
const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// Schéma pour mise à jour du profil (nom + email)
const profileSchema = z.object({
  name: z.string().min(2, 'Nom trop court').max(100).optional().or(z.literal('')),
  email: z.string().email('Email invalide'),
});

async function getCurrentUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authCookieName)?.value;
  if (!token) throw new Error('UNAUTHENTICATED');

  const { userId } = verifyToken(token) as { userId: number; role: 'ADMIN' | 'USER' };
  return userId;
}

export async function changePasswordAction(formData: FormData) {
  const data = passwordSchema.parse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  });

  const userId = await getCurrentUserId();
  const user = await userRepo.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  const ok = await bcrypt.compare(data.currentPassword, user.password);
  if (!ok) throw new Error('INVALID_CURRENT_PASSWORD');

  const hash = await bcrypt.hash(data.newPassword, 12);
  await userRepo.updatePassword(userId, hash);

  // on revalide bien la bonne page
  revalidatePath('/admin/settings');
}

export async function updateProfileAction(formData: FormData) {
  const data = profileSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  const userId = await getCurrentUserId();
  const user = await userRepo.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  // Si l'email change, vérifier qu'il n'est pas déjà pris
  if (data.email !== user.email) {
    const existing = await userRepo.findByEmail(data.email);
    if (existing && existing.id !== userId) {
      throw new Error('EMAIL_TAKEN');
    }
  }

  await userRepo.updateProfile(userId, {
    email: data.email,
    name: data.name && data.name.trim() ? data.name.trim() : null,
  });

  revalidatePath('/admin/settings');
}
