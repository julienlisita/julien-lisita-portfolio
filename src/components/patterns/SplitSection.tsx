// src/components/patterns/SplitSection.tsx

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import './SplitSection.css';
import SectionTitle from '@/components/ui/SectionTitle';
import Subtitle from '@/components/ui/Subtitle';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';

type SplitSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  /** Ratio de l'image : square (1/1), landscape (4/3), portrait (3/4) */
  aspect?: 'square' | 'landscape' | 'portrait';
  /** Ajustement du contenu de l'image : contain ou cover */
  imageFit?: 'contain' | 'cover';
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  tone?: 'default' | 'muted' | 'brand';
  className?: string;
  children?: React.ReactNode;
};

export default function SplitSection({
  eyebrow,
  title,
  subtitle,
  content,
  imageSrc,
  imageAlt,
  reverse = false,
  aspect = 'square',
  imageFit = 'contain',
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  tone = 'default',
  className,
  children,
}: SplitSectionProps) {
  return (
    <Section className={clsx('split', `split--${tone}`, className)}>
      <SectionWrapper>
        <div className={clsx('split__grid', reverse && 'is-reverse')}>
          {/* IMAGE */}
          <div className="split__media">
            <div className={clsx('split__img-wrap', `aspect-${aspect}`)}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={clsx(
                  'split__img',
                  imageFit === 'cover' ? 'object-cover' : 'object-contain'
                )}
                priority
              />
            </div>
          </div>

          {/* TEXTE */}
          <div className="split__body">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <SectionTitle className="text-center md:text-left">{title}</SectionTitle>}
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            {content && <div className="split__text">{content}</div>}
            {children && <div className="split__extra">{children}</div>}

            {(ctaLabel || secondaryCtaLabel) && (
              <div className="split__actions">
                {ctaLabel && ctaHref && (
                  <Button href={ctaHref} variant="primary">
                    {ctaLabel}
                  </Button>
                )}
                {secondaryCtaLabel && secondaryCtaHref && (
                  <Button href={secondaryCtaHref} variant="secondary">
                    {secondaryCtaLabel}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>
    </Section>
  );
}
