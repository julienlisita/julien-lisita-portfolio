// src/components/home/ServicesTeaser.tsx

import { services } from '@/data/services';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import ActionsStack from '../patterns/ActionsStack';
import ServicesGrid from './ServicesGrid';

export default function ServicesTeaser() {
  return (
    <Section bgColor="#A8D5BA15">
      <SectionWrapper>
        <HeaderBlock
          eyebrow="Nos Services"
          title="Ce que nous proposons"
          subtitle="Un accompagnement complet et bienveillant au quotidien."
          align="center"
        />

        <ServicesGrid items={services.slice(0, 3)} />

        <ActionsStack
          align="center"
          className="mt-8"
          items={[
            { label: 'Tous les services', href: '/services', variant: 'primary' },
            { label: 'Nous contacter', href: '/contact', variant: 'secondary' },
          ]}
        />
      </SectionWrapper>
    </Section>
  );
}
