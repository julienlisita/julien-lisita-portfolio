// src/components/home/TestimonialsTeaser.tsx

'use client';

import type { Testimonial } from '@/types/testimonial';

import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import ActionsStack from '../patterns/ActionsStack';

import TestimonialsGrid from './TestimonialsGrid';

type Props = {
  items: ReadonlyArray<Testimonial>;
};

export default function TestimonialsTeaser({ items }: Props) {
  return (
    <Section>
      <SectionWrapper>
        <HeaderBlock
          eyebrow="Ils nous font confiance"
          title="Les avis de nos clients"
          subtitle="Avis vérifiés, triés et présentés pour vous aider à décider."
          align="center"
        />

        <TestimonialsGrid items={items} />

        <ActionsStack
          align="center"
          className="mt-8"
          items={[
            {
              label: 'Voir tous les témoignages',
              href: '/testimonials',
              variant: 'primary',
            },
          ]}
        />
      </SectionWrapper>
    </Section>
  );
}
