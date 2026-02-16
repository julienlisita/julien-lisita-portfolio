// src/app/admin/layout.tsx

export const dynamic = 'force-dynamic';

import type { ReactNode } from 'react';

import { logoutAction } from '@/app/(site)/(auth)/actions';
import AdminNav from '@/components/admin/AdminNav';
import { requireAdminApp } from '@/server/guards/requireAdmin.app';

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const user = await requireAdminApp(); // protège tout le segment /admin

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header admin */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              Espace administrateur
            </p>
            <h1 className="text-sm font-semibold">Back-office</h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">
                {user.name ? user.name : `Admin #${user.userId}`}
              </p>
              <p className="text-xs text-neutral-500 truncate max-w-[200px]">{user.email}</p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs px-3 py-1.5 rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Nav : full-width en mobile, colonne fixe en desktop */}
        <aside className="w-full md:w-56 md:shrink-0">
          <AdminNav />
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
