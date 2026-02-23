// src/app/(site)/services/suivi-et-evolutions/page.tsx

import MaintenanceScreen from '@/screens/services/MaintenanceScreen';

export const metadata = {
  title: 'Services – Nom entreprise',
  description:
    'Découvrez nos services sur mesure pour professionnels et particuliers : développement web, accompagnement digital, et plus encore.',
  alternates: {
    canonical: 'https://www.exemple.com/services',
  },
};

export default function MaintenancePage() {
  return <MaintenanceScreen />;
}
