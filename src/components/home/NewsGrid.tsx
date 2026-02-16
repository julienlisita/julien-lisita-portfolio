// src/components/home/NewsGrid.tsx

import type { NewsItem } from '@/types/news';
import NewsCard from '../news/NewsCard';

type Props = {
  items: ReadonlyArray<NewsItem>;
};

export default function NewsGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="font-ui text-sm" style={{ color: 'var(--color-muted)' }}>
        Aucune actualité disponible.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {items.map((n) => (
        <NewsCard
          key={n.id ?? n.slug}
          title={n.title}
          description={n.description}
          displayDate={n.displayDate}
          source={n.source}
          url={n.url}
          imageUrl={n.imageUrl}
          imageAlt={n.imageAlt ?? n.title}
        />
      ))}
    </div>
  );
}
