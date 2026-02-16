// src/screens/Home.tsx

import AboutTeaser from '@/components/home/AboutTeaser';
import Hero from '@/components/home/Hero';
import ServicesTeaser from '@/components/home/ServicesTeaser';
import Cta from '@/components/patterns/Cta';

import TestimonialsTeaserServer from '@/components/home/TestimonialsTeaserServer';
import NewsTeaserServer from '@/components/home/NewsTeaserServer';

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <TestimonialsTeaserServer />
      <NewsTeaserServer />
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
