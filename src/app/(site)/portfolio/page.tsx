// src/app/(site)/portfolio/page.tsx

import Portfolio from '@/screens/Portfolio';

export const metadata = {
  title: 'Portfolio – Réalisations et projets',
  description:
    'Découvrez une sélection de projets et de réalisations mettant en avant le savoir-faire et l’expertise, conçus pour inspirer et rassurer les clients.',
  alternates: {
    canonical: 'https://www.exemple.com/portfolio',
  },
};

export default function PortfolioPage() {
  return <Portfolio />;
}
