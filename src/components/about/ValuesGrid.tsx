// src/components/about/ValuesGrid.tsx

'use client';

import type { FeatureItem } from '@/types/feature';
import FeatureCard from '../data-display/FeatureCard';
import { ICONS, type IconKey } from '@/utils/icons';
import type React from 'react';

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

export default function ValuesGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="font-ui text-sm" style={{ color: 'var(--color-muted)' }}>
        Aucune valeur disponible.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
      {items.map((v, i) => (
        <FeatureCard
          key={v.title ?? i}
          icon={resolveIcon(v.icon)}
          title={v.title}
          description={v.description}
          href={v.href}
          accent="neutral"
          withHeader
          align="center"
        />
      ))}
    </div>
  );
}
