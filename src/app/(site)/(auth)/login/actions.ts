// src/app/(site)/(auth)/login/actions.ts

'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { login } from '@/server/services/auth.service';
import { authCookieName, authCookieOptions } from '@/lib/auth-cookies';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginAction(formData: FormData) {
  const data = schema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  try {
    const { token } = await login(data);

    const cookieStore = await cookies();
    cookieStore.set(authCookieName, token, authCookieOptions);
  } catch (err) {
    if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
      console.warn('[loginAction] invalid credentials for', data.email);
      redirect('/login?error=invalid-credentials');
    }

    console.error('[loginAction] unexpected error', err);
    redirect('/login?error=unknown');
  }

  redirect('/admin');
}
