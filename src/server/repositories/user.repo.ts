// src/server/repositories/user.repo.ts

import { prisma } from '@/lib/prisma';
import type { Role } from '@prisma/client';

export const userRepo = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },
  create(data: { email: string; password: string; name?: string; role?: Role }) {
    return prisma.user.create({ data });
  },
  updatePassword(id: number, password: string) {
    return prisma.user.update({ where: { id }, data: { password } });
  },
  updateProfile(
    id: number,
    data: {
      email?: string;
      name?: string | null;
    }
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },
};
