// src/server/guards/requireAuth.app.ts

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import { authCookieName } from '@/lib/auth-cookies';

export async function requireAuthApp() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authCookieName)?.value;
  if (!token) redirect('/login');

  try {
    const user = verifyToken(token) as { userId: number; role: 'ADMIN' | 'USER' };
    return user; // optionnel : renvoie l'user si tu en as besoin
  } catch {
    redirect('/login');
  }
}
