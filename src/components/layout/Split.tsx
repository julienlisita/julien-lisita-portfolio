// src/components/layout/Split.tsx

type SplitProps = {
  reverse?: boolean; // image à gauche sur desktop
  gap?: string; // ex: "gap-8 md:gap-12"
  className?: string;
  children: [React.ReactNode, React.ReactNode];
};
export default function Split({
  reverse,
  gap = 'gap-8 md:gap-12',
  className,
  children,
}: SplitProps) {
  return (
    <div
      className={`grid items-center md:grid-cols-2 ${gap} ${reverse ? 'md:[&>*:first-child]:order-2' : ''} ${className ?? ''}`}
    >
      {children[0]}
      {children[1]}
    </div>
  );
}
