// src/components/patterns/FeaturesGrid.tsx

'use client';

import React, { ComponentProps, useMemo, useState } from 'react';
import FeatureCard from '@/components/data-display/FeatureCard';
import clsx from 'clsx';
import './FeaturesGrid.css';

import { ICONS, type IconKey } from '@/utils/icons';

type FeatureCardProps = ComponentProps<typeof FeatureCard>;
type CardVariant = FeatureCardProps['variant'];
type CardAccent = FeatureCardProps['accent'];
type CardAlign = FeatureCardProps['align'];
type CardWithHeader = FeatureCardProps['withHeader'];

/** Type par défaut pour un "feature" */
export type FeatureItem = {
  icon:
    | IconKey
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string | React.ReactNode;
  href?: string;
};

export type FeaturesGridProps<TItem = FeatureItem> = {
  /** Données des cartes */
  items: ReadonlyArray<TItem>;

  /** Rendu personnalisé d’un item (sinon FeatureCard par défaut) */
  renderItem?: (item: TItem, index: number) => React.ReactNode;

  /** Clé personnalisée pour chaque item (sinon index) */
  // ❌ À éviter si parent serveur : renderItem?: (item: TItem, index: number) => React.ReactNode;
  getKey?: (item: TItem, index: number) => React.Key;
  cardVariant?: CardVariant;
  cardAccent?: CardAccent;
  cardWithHeader?: CardWithHeader;
  cardAlign?: CardAlign;

  /** Pagination optionnelle */
  pageSize?: number;

  /** Filtrage par onglets (facultatif) */
  tabs?: Array<{ label: string; value: string }>;
  defaultTab?: string;
  filterByTab?: (item: TItem, tabValue: string) => boolean;

  /** Classes additionnelles */
  className?: string;
  gridClassName?: string;
};

export default function FeaturesGrid<TItem = FeatureItem>({
  items,
  renderItem,
  getKey,
  cardVariant = 'default',
  cardAccent = 'neutral',
  cardWithHeader = false,
  cardAlign = 'center',
  pageSize,
  tabs,
  defaultTab,
  filterByTab,
  className,
  gridClassName,
}: FeaturesGridProps<TItem>) {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTab);

  // Filtrage par onglet
  const tabbedItems = useMemo(() => {
    if (!tabs || !filterByTab || !activeTab) return items;
    return items.filter((it) => filterByTab(it, activeTab));
  }, [items, tabs, filterByTab, activeTab]);

  // Pagination
  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(tabbedItems.length / pageSize));
  }, [tabbedItems.length, pageSize]);

  const pageItems = useMemo(() => {
    if (!pageSize) return tabbedItems;
    const start = (page - 1) * pageSize;
    return tabbedItems.slice(start, start + pageSize);
  }, [tabbedItems, page, pageSize]);

  const hasPagination = Boolean(pageSize) && totalPages > 1;

  // Rendu par défaut
  const defaultRenderItem = (it: unknown, i: number) => {
    const f = it as FeatureItem;
    let iconEl: React.ReactElement | undefined = undefined;

    if (typeof f.icon === 'string') {
      const IconComp = ICONS[f.icon as IconKey];
      iconEl = IconComp ? <IconComp /> : undefined;
    } else if (React.isValidElement(f.icon)) {
      iconEl = f.icon as React.ReactElement;
    } else if (typeof f.icon === 'function') {
      const IconComp = f.icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
      iconEl = <IconComp />;
    }

    return (
      <FeatureCard
        key={i}
        icon={iconEl}
        title={f.title}
        description={f.description}
        href={f.href}
        variant={cardVariant}
        accent={cardAccent}
        withHeader={cardWithHeader}
        align={cardAlign}
      />
    );
  };

  return (
    <div className={clsx('features-lite', className)}>
      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <div className="features__tabs mb-8">
          <ul className="features__tabs-list">
            {tabs.map((t) => {
              const isActive = activeTab === t.value || (!activeTab && t.value === defaultTab);
              return (
                <li key={t.value}>
                  <button
                    type="button"
                    className={clsx('features__tab', isActive && 'is-active')}
                    onClick={() => {
                      setActiveTab(t.value);
                      setPage(1);
                    }}
                  >
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Grille */}
      <div
        className={clsx(
          'features__grid',
          gridClassName ?? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8'
        )}
      >
        {pageItems.map((item, i) =>
          renderItem ? (
            <React.Fragment key={getKey ? getKey(item, i) : i}>
              {renderItem(item, i)}
            </React.Fragment>
          ) : (
            defaultRenderItem(item, i)
          )
        )}
      </div>

      {/* Pagination */}
      {hasPagination && (
        <div className="features__pagination mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            className="features__page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Précédent
          </button>
          <span className="features__page-info">
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            className="features__page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
