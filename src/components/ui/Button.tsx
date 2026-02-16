// src/components/ui/Button.tsx

'use client';

import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import './Button.css';

type Variant = 'primary' | 'secondary';

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

/**
 * Cas <a> (lien)
 */
type AnchorButtonProps = BaseProps & {
  href: string;
  download?: boolean;
  target?: string;
  rel?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;

/**
 * Cas <button> natif
 */
type NativeButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined; // interdit href côté <button>
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

function isAnchorProps(p: ButtonProps): p is AnchorButtonProps {
  return 'href' in p && typeof p.href === 'string' && p.href.length > 0;
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith('//');
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className, children } = props as BaseProps;
  const combinedClassName = clsx('btn', variant, className);

  if (isAnchorProps(props)) {
    const { href, download, target, rel, ...anchorRest } = props;

    const safeRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel;

    // 1) Cas natif <a> si externe, target ou download
    if (isExternal(href) || target || download) {
      return (
        <a
          href={href}
          className={combinedClassName}
          target={target}
          rel={safeRel}
          download={download}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    // 2) Cas interne : Next Link + <a> enfant
    return (
      <Link href={href} className={combinedClassName} {...anchorRest}>
        {children}
      </Link>
    );
  }

  // Cas bouton natif
  const { disabled, ...buttonRest } = props as NativeButtonProps;

  return (
    <button className={combinedClassName} disabled={disabled} {...buttonRest}>
      {children}
    </button>
  );
}
