// src/app/(site)/services/creation-site-internet-fonctionnalites-sur-mesure/page.tsx

import CustomFeaturesPageScreen from '@/screens/services/CustomFeaturesPageScreen';

export const metadata = {
  title: 'Services – Nom entreprise',
  description:
    'Découvrez nos services sur mesure pour professionnels et particuliers : développement web, accompagnement digital, et plus encore.',
  alternates: {
    canonical: 'https://www.exemple.com/services',
  },
};

export default function CustomFeaturesPage() {
  return <CustomFeaturesPageScreen />;
}
