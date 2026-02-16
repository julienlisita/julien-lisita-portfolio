// src/components/contact/LocationSection.tsx

'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Subtitle from '@/components/ui/Subtitle';
import clsx from 'clsx';
import './LocationSection.css';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';

type Props = {
  className?: string;
  align?: 'left' | 'center' | 'right';
};

const LOCATIONS = [
  {
    title: 'Arcachon',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46063.801434249!2d-1.213208343706834!3d44.651519874040474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd549ef8c86711e3%3A0x40665174816f060!2s33120%20Arcachon!5e1!3m2!1sfr!2sfr!4v1761311017194!5m2!1sfr!2sfr',
  },
  {
    title: 'Bordeaux',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117808.50288098304!2d-0.7678853175731898!3d44.86226177535805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527e8f751ca81%3A0x796386037b397a89!2sBordeaux!5e1!3m2!1sfr!2sfr!4v1761310773492!5m2!1sfr!2sfr',
  },
];

export default function LocationSection({ className, align = 'center' }: Props) {
  const alignClass =
    align === 'left' ? 'align-left' : align === 'right' ? 'align-right' : 'align-center';

  return (
    <Section className={clsx('location-section', className)}>
      <SectionWrapper>
        <div className={clsx('location-header', alignClass)}>
          <Eyebrow>NOS ZONES D’INTERVENTION</Eyebrow>
          <SectionTitle>Nous intervenons dans plusieurs secteurs</SectionTitle>
          <Subtitle>
            Découvrez les principales zones où nos services sont disponibles. Contactez-nous pour
            vérifier la couverture dans votre région.
          </Subtitle>
        </div>

        {/* Cartes */}
        <div className="location-grid">
          {LOCATIONS.map(({ title, src }) => (
            <div key={title} className={clsx('location-card', alignClass)}>
              <div className="location-map">
                <iframe
                  title={title}
                  src={src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <h3 className="location-title">{title}</h3>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </Section>
  );
}
