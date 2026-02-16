// src/components/services/ServicesGrid.tsx

'use client';

import type React from 'react';
import type { FeatureItem } from '@/types/feature';
import { ICONS, type IconKey } from '@/utils/icons';
import FeatureCard from '../data-display/FeatureCard';

type Props = {
  items: ReadonlyArray<FeatureItem>;
};

function resolveIcon(icon: FeatureItem['icon']): React.ReactElement | undefined {
  if (typeof icon === 'string') {
    const Icon = ICONS[icon as IconKey];
    return Icon ? <Icon /> : undefined;
  }

  if (typeof icon === 'function') {
    const Icon = icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    return <Icon />;
  }

  return icon as React.ReactElement;
}

export default function ServicesGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="font-ui text-sm" style={{ color: 'var(--color-muted)' }}>
        Aucun service disponible.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
      {items.map((s, i) => (
        <FeatureCard
          key={s.title ?? i}
          icon={resolveIcon(s.icon)}
          title={s.title}
          description={s.description}
          href={s.href}
          variant="gradient"
          accent="primary"
          align="center"
        />
      ))}
    </div>
  );
}
