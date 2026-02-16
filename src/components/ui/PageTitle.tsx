// src/components/ui/PageTitle.tsx

type PageTitleProps = {
  className?: string;
  children: React.ReactNode;
  color?: string;
};

const resolveColor = (color: string) => {
  if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl')) {
    return color;
  }
  return `var(--color-${color})`;
};

export default function PageTitle({ className = '', children, color = 'terre' }: PageTitleProps) {
  return (
    <h1
      className={`${className}
        text-2xl sm:text-3xl lg:text-5xl
        font-heading font-bold
        text-center
      `}
      style={{ color: resolveColor(color) }}
    >
      {children}
    </h1>
  );
}
