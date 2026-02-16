// src/components/recruitment/JobOffersSectionServer.tsx

import JobOffersSection from './JobOffersSection';
import { getPublicJobOffersServer } from '@/server/services/jobOffers.server';

export default async function JobOffersSectionServer() {
  const offers = await getPublicJobOffersServer();
  return <JobOffersSection items={offers} />;
}
