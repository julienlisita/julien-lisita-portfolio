// src/components/recruitment/JobOffersSection.tsx

'use client';

import { useMemo, useState } from 'react';
import type { JobOffer } from '@/types/job';

import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import Pagination from '../navigation/Pagination';

import JobOffersGrid from './JobOffersGrid';

type Props = { items: ReadonlyArray<JobOffer> };

const PAGE_SIZE = 5;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function JobOffersSection({ items }: Props) {
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
    <Section>
      <SectionWrapper>
        <HeaderBlock title="NOS OFFRES D’EMPLOI" align="center" />

        <div className="mt-6">
          <JobOffersGrid items={pageItems} />
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
