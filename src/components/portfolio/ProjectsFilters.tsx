// src/components/portfolio/ProjectsFilters.tsx

'use client';

import './ProjectsFilters.css';

export type ProjectTab = 'all' | 'featured' | 'fullstack' | 'frontend' | 'backend' | 'templates';

type Props = {
  activeTab: ProjectTab;
  onChangeTab: (tab: ProjectTab) => void;
};

const TABS: Array<{ key: ProjectTab; label: string }> = [
  { key: 'all', label: 'Tous' },
  { key: 'featured', label: 'Mis en avant' },
  { key: 'fullstack', label: 'Fullstack' },
  { key: 'frontend', label: 'Front' },
  { key: 'backend', label: 'Back' },
  { key: 'templates', label: 'Templates' },
];

export default function ProjectsFilters({ activeTab, onChangeTab }: Props) {
  return (
    <div className="projects-filters">
      <div className="projects-filters__row">
        <p className="projects-filters__label">Filtrer</p>

        <div className="projects-filters__chips" role="tablist" aria-label="Filtres projets">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={activeTab === t.key}
              className={['chip', activeTab === t.key ? 'is-active' : ''].join(' ')}
              onClick={() => onChangeTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
