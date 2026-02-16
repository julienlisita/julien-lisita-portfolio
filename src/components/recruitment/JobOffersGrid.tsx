// src/components/recruitment/JobOffersGrid.tsx

import type { JobOffer } from '@/types/job';
import { JobOfferCard } from './JobOfferCard';

type Props = {
  items: ReadonlyArray<JobOffer>;
};

export default function JobOffersGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="font-ui text-sm" style={{ color: 'var(--color-muted)' }}>
        Aucune offre disponible pour le moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-8">
      {items.map((offer) => (
        <JobOfferCard
          key={offer.id}
          slug={offer.slug}
          title={offer.title}
          location={offer.location}
          description={offer.description ?? ''}
          contractType={offer.contractType}
          publishedAt={offer.publishedAt}
        />
      ))}
    </div>
  );
}
