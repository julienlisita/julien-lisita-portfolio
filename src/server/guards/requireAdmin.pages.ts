import type { GetServerSidePropsContext } from 'next';
import { requireAuthPages } from './requireAuth.pages';
import { userRepo } from '@/server/repositories/user.repo';

export async function requireAdminPages(ctx: GetServerSidePropsContext) {
  const session = requireAuthPages(ctx);
  if (!session || session.role !== 'ADMIN') {
    return { redirect: { destination: '/', permanent: false } } as const;
  }

  const user = await userRepo.findById(session.userId);
  if (!user) {
    return { redirect: { destination: '/login', permanent: false } } as const;
  }

  return {
    props: {
      admin: {
        userId: user.id,
        role: user.role,
        name: user.name ?? null,
        email: user.email,
      },
    },
  } as const;
}
