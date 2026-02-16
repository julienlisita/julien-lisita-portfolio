// src/components/portfolio/ProjectsSection.tsx

'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/types/project';

import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import Pagination from '../navigation/Pagination';

import ProjectsGrid from './ProjectsGrid';
import ProjectsFilters, { ProjectTab } from './ProjectsFilters';

const PAGE_SIZE = 6;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ProjectsSection({ items }: { items: ReadonlyArray<Project> }) {
  const [activeTab, setActiveTab] = useState<ProjectTab>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (activeTab === 'featured') return items.filter((p) => Boolean(p.highlight));
    if (activeTab === 'fullstack') return items.filter((p) => p.category === 'fullstack');
    if (activeTab === 'frontend') return items.filter((p) => p.category === 'frontend');
    if (activeTab === 'backend') return items.filter((p) => p.category === 'backend');
    if (activeTab === 'templates') return items.filter((p) => p.category === 'template');
    return items;
  }, [items, activeTab]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
    [filtered.length]
  );

  const safePage = useMemo(() => clamp(page, 1, totalPages), [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const onChangeTab = (tab: ProjectTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const onPrev = () => setPage((p) => clamp(p - 1, 1, totalPages));
  const onNext = () => setPage((p) => clamp(p + 1, 1, totalPages));

  return (
    <Section bgColor="var(--section-projects-bg)">
      <SectionWrapper>
        <HeaderBlock
          eyebrow="Portfolio"
          title="Projets sélectionnés"
          subtitle="Des projets concrets pour montrer ma façon de concevoir et livrer des applications."
          align="center"
        />

        <ProjectsFilters activeTab={activeTab} onChangeTab={onChangeTab} />

        <p className="font-ui text-sm mt-4" style={{ color: 'var(--color-muted)' }}>
          {filtered.length} projet{filtered.length > 1 ? 's' : ''} — page {safePage}/{totalPages}
        </p>

        <div className="mt-6">
          <ProjectsGrid items={pageItems} />
        </div>

        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPrev={onPrev}
          onNext={onNext}
          className="mt-8"
        />
      </SectionWrapper>
    </Section>
  );
}
