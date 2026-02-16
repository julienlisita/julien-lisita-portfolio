// src/server/guards/requireAdminApp.ts

import { redirect } from 'next/navigation';
import { requireAuthApp } from './requireAuth.app';
import { userRepo } from '@/server/repositories/user.repo';

export async function requireAdminApp() {
  const session = await requireAuthApp(); // { userId, role }

  if (session.role !== 'ADMIN') redirect('/');

  const user = await userRepo.findById(session.userId);
  if (!user) redirect('/login');

  return {
    userId: user.id,
    role: user.role,
    name: user.name ?? null,
    email: user.email,
  };
}
