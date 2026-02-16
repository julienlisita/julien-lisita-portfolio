// src/components/ui/SectionTitle.tsx

import clsx from 'clsx';
import './SectionTitle.css';

type SectionTitleProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  focusable?: boolean;
};

export default function SectionTitle({
  id,
  children,
  className = '',
  focusable = false,
}: SectionTitleProps) {
  return (
    <h2 id={id} className={clsx('title', className)} tabIndex={focusable ? -1 : undefined}>
      {children}
    </h2>
  );
}
