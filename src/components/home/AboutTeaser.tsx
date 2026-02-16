// src/components/home/AboutTeaser.tsx

import SplitSection from '../patterns/SplitSection';

type Props = {
  className?: string;
};

export default function AboutTeaser({ className }: Props) {
  return (
    <SplitSection
      // contenu
      eyebrow="Notre mission"
      title="Un accompagnement humain et personnalisé"
      subtitle="La proximité est au cœur de nos valeurs"
      content={
        <>
          Nous croyons à l’importance d’une approche centrée sur l’humain et la qualité. Chaque
          projet est mené avec soin, professionnalisme et transparence, afin de bâtir une relation
          de confiance et de répondre aux attentes réelles de nos partenaires et clients.
        </>
      }
      // image
      imageSrc="/images/square-placeholder.png"
      imageAlt="Accompagnement à domicile chaleureux"
      // layout
      reverse
      aspect="square"
      className={className ?? 'mt-8'}
      // CTAs
      ctaLabel="En savoir plus"
      ctaHref="/about"
      secondaryCtaLabel="Nous contacter"
      secondaryCtaHref="/contact"
    >
      {/* Slot libre (liste de points forts) */}
      <ul className="list-disc pl-6 text-left inline-block">
        <li>Expertise et engagement</li>
        <li>Accompagnement sur mesure</li>
        <li>Vision tournée vers l’avenir</li>
      </ul>
    </SplitSection>
  );
}
