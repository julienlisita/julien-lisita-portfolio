// src/app/(site)/services/creation-site-internet/page.tsx

import WebsiteCreationScreen from '@/screens/services/WebsiteCreationScreen';

export const metadata = {
  title: 'Services – Nom entreprise',
  description:
    'Découvrez nos services sur mesure pour professionnels et particuliers : développement web, accompagnement digital, et plus encore.',
  alternates: {
    canonical: 'https://www.exemple.com/services',
  },
};

export default function WebsiteCreationPage() {
  return <WebsiteCreationScreen />;
}
