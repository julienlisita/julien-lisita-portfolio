// src/components/patterns/ActionsStack.tsx

import clsx from 'clsx';
import Button from '@/components/ui/Button';
import { flexAlignResponsive } from '@/utils/align';

type CTA = { label: string; href: string; variant?: 'primary' | 'secondary' };

type Props = {
  items?: CTA[];
  align?: 'left' | 'center' | 'right';
  className?: string;
  gap?: string;
};

export default function ActionsStack({
  items = [],
  align = 'center',
  className,
  gap = 'gap-4',
}: Props) {
  if (!items.length) return null;

  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row items-center',
        flexAlignResponsive(align),
        gap,
        className
      )}
    >
      {items.map((cta, i) => (
        <Button
          key={`${cta.label}-${i}`}
          href={cta.href}
          variant={cta.variant ?? (i === 0 ? 'primary' : 'secondary')}
        >
          {cta.label}
        </Button>
      ))}
    </div>
  );
}
