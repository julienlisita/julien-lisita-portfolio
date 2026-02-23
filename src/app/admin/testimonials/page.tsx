// src/app/admin/testimonials/page.tsx

import TestimonialsAdminScreen from '@/screens/admin/TestimonialsAdminScreen';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Administration – Témoignages' };

export default function TestimonialsAdminPage() {
  return <TestimonialsAdminScreen />;
}
