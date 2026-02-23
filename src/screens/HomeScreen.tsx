// src/screens/HomeScreen.tsx

import AboutTeaser from '@/components/home/AboutTeaser';
import Hero from '@/components/home/Hero';
import ServicesTeaser from '@/components/home/ServicesTeaser';
import Cta from '@/components/patterns/Cta';

import TestimonialsTeaserServer from '@/components/home/TestimonialsTeaserServer';

export default function HomeScreen() {
  return (
    <div>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <TestimonialsTeaserServer />
      <Cta
        title="Prêt à en savoir plus ?"
        description="Contactez-nous dès aujourd’hui pour découvrir comment nous pouvons vous accompagner."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
