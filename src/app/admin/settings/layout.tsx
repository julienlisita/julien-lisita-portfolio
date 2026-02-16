// src/app/admin/settings/layout.tsx

import { requireAuthApp } from '@/server/guards/requireAuth.app';

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  await requireAuthApp(); // Next 15: requireAuth est async
  return <>{children}</>;
}
