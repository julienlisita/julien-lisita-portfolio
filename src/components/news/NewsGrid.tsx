// src/components/news/NewsGrid.tsx

import type { NewsItem } from '@/types/news';
import NewsCard from './NewsCard';

type Props = {
  items: ReadonlyArray<NewsItem>;
};

export default function NewsGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="font-ui text-sm" style={{ color: 'var(--color-muted)' }}>
        Aucun article disponible.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
      {items.map((item) => (
        <NewsCard
          key={item.id ?? item.slug}
          title={item.title}
          description={item.description}
          displayDate={item.displayDate}
          source={item.source}
          url={item.url}
          imageUrl={item.imageUrl}
          imageAlt={item.imageAlt ?? item.title}
        />
      ))}
    </div>
  );
}
