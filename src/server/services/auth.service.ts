// src/server/services/auth.service.ts

import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';
import { userRepo } from '../repositories/user.repo';

export async function signup(input: {
  email: string;
  password: string;
  name?: string;
  role?: 'ADMIN' | 'USER';
}) {
  const exists = await userRepo.findByEmail(input.email);
  if (exists) throw new Error('EMAIL_TAKEN');

  const hash = await bcrypt.hash(input.password, 12);
  const user = await userRepo.create({
    email: input.email,
    password: hash,
    name: input.name,
    role: input.role ?? 'USER',
  });

  const token = signToken({ userId: user.id, role: user.role });
  return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
}

export async function login(input: { email: string; password: string }) {
  const user = await userRepo.findByEmail(input.email);
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) throw new Error('INVALID_CREDENTIALS');

  const token = signToken({ userId: user.id, role: user.role });
  return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
}
