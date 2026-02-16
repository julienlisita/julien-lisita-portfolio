// src/app/admin/testimonials/page.tsx

export const dynamic = 'force-dynamic';

import TestimonialsAdmin from '@/screens/admin/TestimonialsAdmin';

export const metadata = { title: 'Administration – Témoignages' };

export default function TestimonialsAdminPage() {
  return <TestimonialsAdmin />;
}
