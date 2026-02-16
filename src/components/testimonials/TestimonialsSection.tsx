// src/components/testimonials/TestimonialsSection.tsx

'use client';

import { useMemo, useState } from 'react';
import type { Testimonial } from '@/types/testimonial';

import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import Pagination from '../navigation/Pagination';
import TestimonialsFilters, { TestimonialTab } from './TestimonialsFilters';
import TestimonialsGrid from './TestimonialsGrid';

const PAGE_SIZE = 4;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function TestimonialsSection({ items }: { items: ReadonlyArray<Testimonial> }) {
  const [activeTab, setActiveTab] = useState<TestimonialTab>('all');
  const [page, setPage] = useState(1);

  // filtrage
  const filtered = useMemo(() => {
    if (activeTab === 'featured') return items.filter((t) => Boolean(t.highlight));
    return items;
  }, [items, activeTab]);

  // pagination
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
    [filtered.length]
  );

  const safePage = useMemo(() => clamp(page, 1, totalPages), [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const onChangeTab = (tab: TestimonialTab) => {
    setActiveTab(tab);
    setPage(1); // reset pagination à chaque changement de filtre
  };

  const onPrev = () => setPage((p) => clamp(p - 1, 1, totalPages));
  const onNext = () => setPage((p) => clamp(p + 1, 1, totalPages));

  return (
    <Section bgColor="#A8D5BA15">
      <SectionWrapper>
        <HeaderBlock
          eyebrow="Ils nous font confiance"
          title="Tous les témoignages"
          subtitle="Consultez les retours authentiques de nos clients."
          align="center"
        />

        <TestimonialsFilters activeTab={activeTab} onChangeTab={onChangeTab} />

        <p className="font-ui text-sm mt-4" style={{ color: 'var(--color-muted)' }}>
          {filtered.length} témoignage{filtered.length > 1 ? 's' : ''} — page {safePage}/
          {totalPages}
        </p>

        <div className="mt-6">
          <TestimonialsGrid items={pageItems} />
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
