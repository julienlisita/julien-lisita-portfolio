// src/utils/align.ts

export type Align = 'left' | 'center' | 'right' | 'inherit';

export const alignToClass = (align: Align = 'inherit') =>
  align === 'inherit'
    ? undefined
    : align === 'left'
      ? 'text-left'
      : align === 'right'
        ? 'text-right'
        : 'text-center';

export const headerAlignResponsive = (align: Exclude<Align, 'inherit'> = 'center') =>
  align === 'left'
    ? 'text-center lg:text-left'
    : align === 'right'
      ? 'text-center lg:text-right'
      : 'text-center lg:text-center';

export const flexAlignResponsive = (align: Exclude<Align, 'inherit'> = 'center') =>
  align === 'left'
    ? 'justify-center sm:justify-start'
    : align === 'right'
      ? 'justify-center sm:justify-end'
      : 'justify-center';
