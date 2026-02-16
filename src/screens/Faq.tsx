// src/screens/Faq.tsx

import Cta from '@/components/patterns/Cta';
import PageHero from '@/components/patterns/PageHero';
import { HelpCircle } from 'lucide-react';

export default function Faq() {
  return (
    <div className="pt-8 sm:pt-10 md:pt-14 lg:pt-20">
      <PageHero
        icon={<HelpCircle size={40} />}
        title="Foire aux questions"
        subtitle="Retrouvez ici les réponses aux questions les plus fréquentes."
        align="center"
      />

      {/* Sections FAQ */}

      <Cta
        title="Vous ne trouvez pas votre réponse ?"
        description="Contactez-nous, nous vous répondrons directement."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
