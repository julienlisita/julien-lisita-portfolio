// src/components/layout/Section.tsx

import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  id?: string;
  labelledBy?: string; // id du titre principal (SectionTitle)
  describedBy?: string; // id du sous-titre (Subtitle)
};

const resolveColor = (color: string): string => {
  if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl')) {
    return color;
  }
  return `var(--color-${color})`;
};

export default function Section({
  children,
  className = '',
  bgColor,
  id,
  labelledBy,
  describedBy,
}: SectionProps) {
  const style = bgColor ? { backgroundColor: resolveColor(bgColor) } : undefined;
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`py-8 sm:py-10 md:py-12 lg:py-16 ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
