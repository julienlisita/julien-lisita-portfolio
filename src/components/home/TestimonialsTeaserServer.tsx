// src/components/home/TestimonialsTeaserServer.tsx

import { getPublicTestimonialsServer } from '@/server/services/testimonials.server';
import TestimonialsTeaser from './TestimonialsTeaser';

export default async function TestimonialsTeaserServer() {
  const LIMIT = 2;
  const onlyFeatured = false;

  const all = await getPublicTestimonialsServer();

  let filtered = onlyFeatured ? all.filter((t) => t.highlight) : all;
  if (filtered.length === 0) filtered = all;

  const items = filtered.slice(0, LIMIT);
  return <TestimonialsTeaser items={items} />;
}
