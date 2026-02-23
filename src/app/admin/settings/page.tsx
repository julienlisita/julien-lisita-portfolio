// src/app/admin/settings/page.tsx

import SettingsAdminScreen from '@/screens/admin/SettingsAdminScreen';
import { requireAdminApp } from '@/server/guards/requireAdmin.app';
import { userRepo } from '@/server/repositories/user.repo';

export default async function AdminSettingsPage() {
  const session = await requireAdminApp();

  const user = await userRepo.findById(session.userId);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return (
    <SettingsAdminScreen
      user={{
        id: user.id,
        name: user.name ?? null,
        email: user.email,
      }}
    />
  );
}
