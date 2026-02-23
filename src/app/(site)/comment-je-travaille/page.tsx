// src/app/(site)/comment-je-travaille/page.tsx

import HowIWorkScreenScreen from '@/screens/HowIWorkScreeen';

export const metadata = {
  title: 'À propos – Votre Nom',
  description:
    'En savoir plus sur notre entreprise, nos valeurs, et notre engagement envers nos clients.',
  alternates: {
    canonical: 'https://www.exemple.com/blog',
  },
};

export default function HowIWorkPage() {
  return <HowIWorkScreenScreen />;
}
