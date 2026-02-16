// src/components/media/Media.tsx

'use client';

import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';
import './Media.css';

type Props = Omit<ImageProps, 'className'> & {
  radius?: 'none' | 'md' | 'xl' | '2xl';
  shadow?: boolean;
  className?: string;
  imgClassName?: string; // facultatif, si tu veux cibler l'image intérieure
};

export default function Media({
  radius = 'xl',
  shadow = false,
  className,
  imgClassName,
  ...img
}: Props) {
  return (
    <div
      className={clsx(
        shadow && 'shadow-lg',
        radius === 'md'
          ? 'rounded-md'
          : radius === 'xl'
            ? 'rounded-xl'
            : radius === '2xl'
              ? 'rounded-2xl'
              : '',
        radius !== 'none' && 'overflow-hidden',
        className
      )}
    >
      <Image {...img} className={clsx('w-full h-auto', imgClassName)} />
    </div>
  );
}
