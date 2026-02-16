// src/app/(site)/services/page.tsx

import Services from '@/screens/Services';

export const metadata = {
  title: 'Services – Nom entreprise',
  description:
    'Découvrez nos services sur mesure pour professionnels et particuliers : développement web, accompagnement digital, et plus encore.',
  alternates: {
    canonical: 'https://www.exemple.com/services',
  },
};

export default function ServicesPage() {
  return <Services />;
}
