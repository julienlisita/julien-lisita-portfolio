// src/components/news/NewsSection.tsx

'use client';

import { useMemo, useState } from 'react';
import type { NewsItem } from '@/types/news';

import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import Pagination from '../navigation/Pagination';

import NewsGrid from './NewsGrid';

type Props = { items: ReadonlyArray<NewsItem> };

const PAGE_SIZE = 6;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function NewsSection({ items }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / PAGE_SIZE)),
    [items.length]
  );

  const safePage = useMemo(() => clamp(page, 1, totalPages), [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, safePage]);

  const onPrev = () => setPage((p) => clamp(p - 1, 1, totalPages));
  const onNext = () => setPage((p) => clamp(p + 1, 1, totalPages));

  return (
    <Section bgColor="#A8D5BA15">
      <SectionWrapper>
        <HeaderBlock title="Articles récents" align="center" />

        <div className="mt-6">
          <NewsGrid items={pageItems} />
        </div>

        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPrev={onPrev}
          onNext={onNext}
          className="mt-8"
        />
      </SectionWrapper>
    </Section>
  );
}
