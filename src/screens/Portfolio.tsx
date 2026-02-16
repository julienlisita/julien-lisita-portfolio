// src/screens/Projects.tsx

import Cta from '@/components/patterns/Cta';
import PageHero from '@/components/patterns/PageHero';
import ProjectsSectionServer from '@/components/portfolio/ProjectsSectionServer';
import { FolderKanban } from 'lucide-react';

export const runtime = 'nodejs';

export default function ProjectsPageView() {
  return (
    <div>
      <PageHero
        icon={<FolderKanban size={40} />}
        title="Projets"
        subtitle="Une sélection de projets pour illustrer ma démarche produit, ma rigueur et mon sens du détail."
        align="center"
      />

      <ProjectsSectionServer />

      <Cta
        title="Vous avez un projet en tête ?"
        description="Je peux vous aider à le cadrer et le livrer proprement avec une base moderne."
        align="left"
        primaryLabel="Me contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
