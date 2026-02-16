// src/server/guards/requireAuth.pages.ts

import type { GetServerSidePropsContext } from 'next';
import { verifyToken } from '@/lib/jwt';
import { authCookieName } from '@/lib/auth-cookies';

export type SessionPayload = { userId: number; role: 'ADMIN' | 'USER' };

export function requireAuthPages(ctx: GetServerSidePropsContext): SessionPayload | null {
  const token = ctx.req.cookies?.[authCookieName];
  if (!token) return null;

  try {
    return verifyToken(token) as SessionPayload;
  } catch {
    return null;
  }
}
