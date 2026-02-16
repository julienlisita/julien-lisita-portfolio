// src/services/jobOffers.server.ts

import { IS_DB } from '@/config/dataMode';
import type { JobOffer } from '@/types/job';
import { jobOffers } from '@/data/jobOffers';

export async function getPublicJobOffersServer(): Promise<ReadonlyArray<JobOffer>> {
  if (!IS_DB) return jobOffers;

  // Import conditionnel (évite de bundler Prisma en mode static/edge)
  const { listPublicJobOffers } = await import('@/server/services/job-offer.service');
  const rows = await listPublicJobOffers();

  return rows as unknown as JobOffer[];
}
