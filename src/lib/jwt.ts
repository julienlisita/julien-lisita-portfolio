// src/lib/jwt.ts
import jwt from 'jsonwebtoken';
// Option 1: utiliser le type Prisma pour le rôle
import type { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET');

export type JwtPayload = { userId: number; role: Role }; // ← number ici

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  // retourne le payload + iat/exp
  return jwt.verify(token, JWT_SECRET) as JwtPayload & { iat: number; exp: number };
}
