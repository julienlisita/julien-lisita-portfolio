// src/components/ui/Subtitle.tsx

import clsx from 'clsx';
import './Subtitle.css';

type SubtitleProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Subtitle({ id, className, children }: SubtitleProps) {
  return (
    <p id={id} className={clsx('subtitle', className)}>
      {children}
    </p>
  );
}
