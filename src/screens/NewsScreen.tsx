// src/screens/NewsScreen.tsx

import NewsSectionServer from '@/components/news/NewsSectionServer';
import Cta from '@/components/patterns/Cta';
import PageHero from '@/components/patterns/PageHero';
import { Newspaper } from 'lucide-react';

export default function NewsScreen() {
  return (
    <div>
      <PageHero
        icon={<Newspaper size={40} />}
        title="Actualités"
        subtitle="Articles, informations et mises à jour : retrouvez ici nos dernières publications."
        align="center"
      />

      <NewsSectionServer />

      <Cta
        title="Une question suite à un article ?"
        description="Contactez-nous : nous vous répondrons rapidement et avec clarté."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
