// src/components/testimonials/TestimonialsFilters.tsx

'use client';

import clsx from 'clsx';
import './TestimonialsFilters.css';

export type TestimonialTab = 'all' | 'featured';

type Props = {
  activeTab: TestimonialTab;
  onChangeTab: (tab: TestimonialTab) => void;

  /** Optionnel : afficher un bouton "Réinitialiser" (utile si tu ajoutes d'autres filtres plus tard) */
  showClear?: boolean;
  onClear?: () => void;
};

export default function TestimonialsFilters({
  activeTab,
  onChangeTab,
  showClear = false,
  onClear,
}: Props) {
  const hasFilters = activeTab !== 'all';

  return (
    <div className="testimonials-filters">
      <div className="testimonials-filters__row">
        <p className="testimonials-filters__label">Filtre</p>

        <div className="testimonials-filters__chips" role="list">
          <button
            type="button"
            className={clsx('chip', activeTab === 'all' && 'is-active')}
            onClick={() => onChangeTab('all')}
          >
            Tous
          </button>

          <button
            type="button"
            className={clsx('chip', activeTab === 'featured' && 'is-active')}
            onClick={() => onChangeTab('featured')}
          >
            Mise en avant
          </button>
        </div>
      </div>

      {(showClear || hasFilters) && (
        <div className="testimonials-filters__actions">
          <button
            type="button"
            className="clear"
            onClick={() => {
              if (onClear) return onClear();
              onChangeTab('all');
            }}
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
}
