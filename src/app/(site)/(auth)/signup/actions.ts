// src/app/(site)/(auth)/signup/actions.ts

'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { authCookieName, authCookieOptions } from '@/lib/auth-cookies';
import { signup } from '@/server/services/auth.service';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
});

export async function signupAction(formData: FormData) {
  const data = schema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name') || undefined,
  });

  const { token } = await signup(data);

  const cookieStore = await cookies();
  cookieStore.set(authCookieName, token, authCookieOptions);
}
