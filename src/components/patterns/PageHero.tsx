// src/components/patterns/PageHero.tsx

import PageTitle from '@/components/ui/PageTitle';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import './PageHero.css';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  icon?: ReactNode;
  className?: string;
};

export default function PageHero({
  title,
  subtitle,
  align = 'center',
  icon,
  className = '',
}: PageHeroProps) {
  return (
    <section
      className={clsx('hero-intro', className, {
        'is-left': align === 'left',
        'is-center': align === 'center',
        'is-right': align === 'right',
      })}
    >
      <div className="hero-intro__inner">
        {icon && (
          <div className="hero-intro__icon" aria-hidden="true">
            {icon}
          </div>
        )}

        {/* IMPORTANT: color="inherit" pour laisser le thème de HeroIntro s’appliquer */}
        <PageTitle className="hero-intro__title" color="inherit">
          {title}
        </PageTitle>

        {subtitle && <p className="hero-intro__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}
