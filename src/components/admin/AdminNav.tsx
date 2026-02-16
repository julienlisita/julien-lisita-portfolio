// src/components/admin/AdminNav.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/reservations', label: 'Réservations' },
  { href: '/admin/slots', label: 'Créneaux' },
  { href: '/admin/news', label: 'Actualités' },
  { href: '/admin/offers', label: 'Offres d’emploi' },
  { href: '/admin/testimonials', label: 'Témoignages' },
  { href: '/admin/settings', label: 'Paramètres' },
  { href: '/', label: '← Retour au site', noActive: true },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border border-neutral-200 rounded-lg p-3 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-3">
        Navigation
      </p>
      <ul className="space-y-1">
        {links.map((link) => {
          const isActive =
            !link.noActive &&
            (pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href)));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'flex items-center gap-2 rounded px-2 py-1.5 transition-colors',
                  isActive ? 'bg-slate-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                )}
              >
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
