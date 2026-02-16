// src/components/portfolio/ProjectsGrid.tsx

import type { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';

type Props = {
  items: ReadonlyArray<Project>;
};

export default function ProjectsGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="font-ui text-sm" style={{ color: 'var(--color-muted)' }}>
        Aucun projet ne correspond à ce filtre.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
      {items.map((p) => (
        <ProjectCard
          key={p.id}
          slug={p.slug}
          title={p.title}
          summary={p.summary}
          kind={p.kind}
          imageUrl={p.coverImageUrl}
          imageAlt={p.coverImageAlt}
          highlight={p.highlight}
        />
      ))}
    </div>
  );
}
