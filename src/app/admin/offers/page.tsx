// src/app/admin/offers/page.tsx

import OffersAdmin from '@/screens/admin/OffersAdmin';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Administration – Offres d’emploi' };

export default function OffersAdminPage() {
  return <OffersAdmin />;
}
