// src/screens/Gallery.tsx

import Cta from '@/components/patterns/Cta';
import PageHero from '@/components/patterns/PageHero';
import { Image } from 'lucide-react';

export default function Gallery() {
  return (
    <div className="pt-8 sm:pt-10 md:pt-14 lg:pt-20">
      <PageHero
        icon={<Image size={40} />}
        title="Galerie"
        subtitle="Découvrez une sélection de réalisations et de moments marquants."
        align="center"
      />

      {/* Galerie */}

      <Cta
        title="Vous avez un projet en tête ?"
        description="Contactez-nous pour en discuter et imaginer ensemble la suite."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
