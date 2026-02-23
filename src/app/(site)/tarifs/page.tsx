// src/app/(site)/tarifs/page.tsx

import Pricing from '@/screens/PricingScreen';

export const metadata = {
  title: 'À propos – Votre Nom',
  description:
    'En savoir plus sur notre entreprise, nos valeurs, et notre engagement envers nos clients.',
  alternates: {
    canonical: 'https://www.exemple.com/Pricing',
  },
};

export default function PricingPage() {
  return <Pricing />;
}
