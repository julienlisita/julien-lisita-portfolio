// src/app/admin/reservations/page.tsx

export const dynamic = 'force-dynamic';

import ReservationsAdmin from '@/screens/admin/ReservationsAdmin';

export const metadata = {
  title: 'Administration – Réservations',
  description: 'Consultez, gérez et annulez les réservations effectuées par les utilisateurs.',
};

export default function ReservationAdminPage() {
  return <ReservationsAdmin />;
}
