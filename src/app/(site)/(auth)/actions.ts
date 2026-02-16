// src/app/(auth)/actions.ts

'use server';

import { cookies } from 'next/headers';
import { authCookieName, authCookieOptions } from '@/lib/auth-cookies';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set(authCookieName, '', { ...authCookieOptions, maxAge: 0 });
  redirect('/login');
}
