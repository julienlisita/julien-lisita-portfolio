// src/screens/ContactScreen.tsx

import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactInfoSection from '@/components/contact/ContactInfoSection';
import LocationSection from '@/components/contact/LocationSection';
import PageHero from '@/components/patterns/PageHero';
import { Mail } from 'lucide-react';

export default function ContactScreen() {
  return (
    <div>
      <PageHero
        icon={<Mail size={40} />}
        title="Nous contacter"
        subtitle="Une question, un besoin ou un message ? Écrivez-nous, nous vous répondrons rapidement."
        align="center"
      />

      <ContactFormSection />

      <ContactInfoSection />

      <LocationSection align="left" />
    </div>
  );
}
