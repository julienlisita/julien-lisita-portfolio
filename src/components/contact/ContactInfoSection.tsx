// src/components/contact/ContactInfoSection.tsx

import { contactInfos } from '@/data/contact';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import ContactInfoGrid from './ContactInfoGrid';

export default function ContactInfoSection() {
  return (
    <Section>
      <SectionWrapper>
        <HeaderBlock
          eyebrow="Contact"
          title="Nos coordonnées"
          subtitle="Joignez-nous par téléphone, email, ou venez nous voir."
          align="center"
        />

        <ContactInfoGrid items={contactInfos} />
      </SectionWrapper>
    </Section>
  );
}
