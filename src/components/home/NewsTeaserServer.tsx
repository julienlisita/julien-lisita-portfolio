// src/components/home/NewsTeaserServer.tsx

import { getPublicNewsServer } from '@/server/services/news.server';
import NewsTeaser from './NewsTeaser';

export default async function NewsTeaserServer() {
  const LIMIT = 4;
  const onlyPublished = true;

  const all = await getPublicNewsServer();

  let filtered = onlyPublished ? all.filter((n) => n.isPublished) : all;
  if (filtered.length === 0) filtered = all;

  const items = filtered.slice(0, LIMIT);

  return <NewsTeaser items={items} />;
}
