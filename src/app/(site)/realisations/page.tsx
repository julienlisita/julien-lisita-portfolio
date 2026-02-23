// src/app/(site)/realisations/page.tsx

import PortfolioScreen from '@/screens/portfolio/PortfolioScreen';

export const metadata = {
  title: 'Portfolio – Réalisations et projets',
  description:
    'Découvrez une sélection de projets et de réalisations mettant en avant le savoir-faire et l’expertise, conçus pour inspirer et rassurer les clients.',
  alternates: {
    canonical: 'https://www.exemple.com/realisations',
  },
};

export default function PortfolioPage() {
  return <PortfolioScreen />;
}
