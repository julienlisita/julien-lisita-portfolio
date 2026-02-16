// src/components/services/ServicesSection.tsx

import { services } from '@/data/services';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import ServicesGrid from './ServicesGrid';

export default function ServicesSection() {
  return (
    <Section>
      <SectionWrapper>
        <HeaderBlock
          eyebrow="Nos Services"
          title="Ce que nous proposons"
          subtitle="Un accompagnement complet et bienveillant au quotidien."
          align="center"
        />

        <ServicesGrid items={services} />
      </SectionWrapper>
    </Section>
  );
}
