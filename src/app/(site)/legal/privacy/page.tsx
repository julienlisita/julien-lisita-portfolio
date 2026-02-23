// src/app/(site)/legal/privacy/page.tsx

import PrivacyScreen from '@/screens/legal/PolicyScreen';

export const metadata = {
  title: 'Politique de confidentialité – Nom entreprise',
  description:
    'Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.',
  alternates: {
    canonical: 'https://www.exemple.com/legal/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyScreen />;
}
