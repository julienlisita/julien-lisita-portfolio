// src/screens/AboutScreen.tsx

import ValuesSection from '@/components/about/ValuesSection';
import Cta from '@/components/patterns/Cta';
import PageHero from '@/components/patterns/PageHero';
import { Users } from 'lucide-react';

export default function AboutScreen() {
  return (
    <div>
      <PageHero
        icon={<Users size={40} />}
        title="Une équipe à votre écoute"
        subtitle="Nous accompagnons particuliers et organisations avec sérieux et proximité.."
        align="center"
      />

      <ValuesSection />

      <Cta
        title="Envie d’échanger avec nous ?"
        description="Notre équipe est disponible pour répondre à vos questions et discuter de vos besoins."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
