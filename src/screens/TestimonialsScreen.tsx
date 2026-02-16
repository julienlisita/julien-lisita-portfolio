// src/screens/TestimonialsScreen.tsx

import { MessageSquare } from 'lucide-react';

import PageHero from '@/components/patterns/PageHero';
import Cta from '@/components/patterns/Cta';
import TestimonialsSectionServer from '@/components/testimonials/TestimonialsSectionServer';

export const runtime = 'nodejs';

export default function TestimonialsScreen() {
  return (
    <div>
      <PageHero
        icon={<MessageSquare size={40} />}
        title="Témoignages"
        subtitle="Découvrez les retours de personnes que nous avons accompagnées."
        align="center"
      />

      <TestimonialsSectionServer />

      <Cta
        title="Une question avant de vous lancer ?"
        description="Contactez-nous : nous vous répondrons rapidement et avec clarté."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
