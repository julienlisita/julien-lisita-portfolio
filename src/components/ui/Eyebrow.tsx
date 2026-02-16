// src/components/ui/Eyebrow.tsx

import clsx from 'clsx';
import './Eyebrow.css';

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  decorative?: boolean;
};

export default function Eyebrow({ className, children, decorative = true }: EyebrowProps) {
  return (
    <span className={clsx('eyebrow', className)} aria-hidden={decorative ? true : undefined}>
      {children}
    </span>
  );
}
