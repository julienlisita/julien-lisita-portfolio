// src/screens/JobOffer.tsx

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Briefcase } from 'lucide-react';

import type { JobOffer as JobOfferType } from '@/types/job';

import PageHero from '@/components/patterns/PageHero';
import JobOfferContent from '@/components/recruitment/job-offer/JobOfferContent';

type Props = {
  offer: JobOfferType;
};

export default function JobOffer({ offer }: Props) {
  const pubDate = format(new Date(offer.publishedAt), 'd MMMM yyyy', { locale: fr });

  return (
    <div>
      <PageHero
        icon={<Briefcase size={40} />}
        title={offer.title}
        subtitle={`${offer.location} • ${offer.contractType} • Publiée le ${pubDate}`}
        align="center"
      />

      <JobOfferContent offer={offer} />
    </div>
  );
}
