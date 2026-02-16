// src/lib/resolveColor.ts

export function resolveColor(color: string): string {
  if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl')) {
    return color;
  }
  return `var(--color-${color})`;
}
