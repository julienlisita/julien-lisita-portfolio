// src/app/(site)/testimonials/page.tsx

import TestimonialsScreen from '@/screens/TestimonialsScreen';

export const metadata = {
  title: 'Témoignages – Avis de nos clients',
  description:
    'Lisez les témoignages et retours d’expérience de nos clients satisfaits, preuve de notre engagement et de notre qualité de service.',
  alternates: {
    canonical: 'https://www.exemple.com/testimonials',
  },
};

export default function TestimonialsPage() {
  return <TestimonialsScreen />;
}
