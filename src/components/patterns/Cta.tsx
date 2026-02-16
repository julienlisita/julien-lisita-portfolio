// src/components/patterns/Cta.tsx

import Button from '@/components/ui/Button';
import clsx from 'clsx';
import './Cta.css';

type Props = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  align?: 'left' | 'center' | 'right';
};

export default function Cta({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  align = 'center',
}: Props) {
  // Mobile toujours centré, desktop selon `align`
  const alignText =
    align === 'left'
      ? 'text-center lg:text-left'
      : align === 'right'
        ? 'text-center lg:text-right'
        : 'text-center';

  // Bloc + texte de la description: mobile centré, desktop à gauche/droite
  const descriptionAlign = clsx(
    'cta-description',
    align === 'left' && 'mx-auto lg:mx-0 lg:mr-auto lg:text-left', // desktop: marge droite auto, gauche 0
    align === 'right' && 'mx-auto lg:mx-0 lg:ml-auto lg:text-right', // desktop: marge gauche auto, droite 0
    align === 'center' && 'mx-auto lg:mx-auto lg:text-center'
  );

  // Boutons: mobile centré, desktop selon `align`
  const actionsAlign = clsx(
    'flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 items-center',
    align === 'left' && 'justify-center lg:justify-start',
    align === 'center' && 'justify-center',
    align === 'right' && 'justify-center lg:justify-end'
  );

  return (
    <section className="cta-section">
      <div className={clsx('space-y-6', alignText)}>
        <h2 className="cta-title">{title}</h2>
        <p className={descriptionAlign}>{description}</p>

        <div className={actionsAlign}>
          {primaryHref && primaryLabel && <Button href={primaryHref}>{primaryLabel}</Button>}
          {secondaryHref && secondaryLabel && (
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
