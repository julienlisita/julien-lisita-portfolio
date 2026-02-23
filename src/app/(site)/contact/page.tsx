// src/app/(site)/contact/page.tsx

import ContactScreen from '@/screens/ContactScreen';

export const metadata = {
  title: 'Contact – Nom entreprise',
  description:
    'Besoin d’informations ou d’un devis ? Contactez-nous via notre formulaire ou par téléphone.',
  alternates: {
    canonical: 'https://www.exemple.com/contact',
  },
};

export default function ContactPage() {
  return <ContactScreen />;
}
