// src/components/about/ValuesSection.tsx

import React from 'react';
import { values } from '@/data/values';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import ValuesGrid from './ValuesGrid';

export default function ValuesSection() {
  const titleId = React.useId();
  const subtitleId = React.useId();

  return (
    <Section bgColor="#A8D5BA15" labelledBy={titleId} describedBy={subtitleId}>
      <SectionWrapper>
        <HeaderBlock
          eyebrow="Nos valeurs"
          title="Ce qui nous guide"
          subtitle="Des principes simples qui structurent notre accompagnement."
          align="center"
        />

        <ValuesGrid items={values} />
      </SectionWrapper>
    </Section>
  );
}
