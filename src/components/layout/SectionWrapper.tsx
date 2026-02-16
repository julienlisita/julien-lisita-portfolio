// src/components/layout/SectionWrapper.tsx

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionWrapper({ children, className = '' }: SectionWrapperProps) {
  return (
    <div
      className={`space-y-6 sm:space-y-8 lg:space-y-12 px-4 sm:px-8 lg:px-24 xl:px-32 ${className}`}
    >
      {children}
    </div>
  );
}
