// src/app/admin/slots/page.tsx

import SlotsAdmin from '@/screens/admin/SlotsAdmin';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Administration – Créneaux',
  description: 'Gérez les créneaux disponibles, les statuts et la planification des réservations.',
};

export default function SlotsAdminPage() {
  return <SlotsAdmin />;
}
