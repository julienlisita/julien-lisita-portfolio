// src/screens/services/ServicesScreen.tsx

import Cta from '@/components/patterns/Cta';
import PageHero from '@/components/patterns/PageHero';
import ServicesSection from '@/components/services/ServicesSection';
import { Briefcase } from 'lucide-react';

export default function ServicesScreen() {
  return (
    <div>
      <PageHero
        icon={<Briefcase size={40} />}
        title="Nos services"
        subtitle="Découvrez l’ensemble des services que nous proposons pour vous accompagner."
        align="center"
      />

      <ServicesSection />

      <Cta
        title="Parlons de vos besoins"
        description="Contactez-nous pour échanger sur votre situation et vos attentes."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
