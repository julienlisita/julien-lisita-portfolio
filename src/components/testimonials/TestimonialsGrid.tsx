// src/components/testimonials/TestimonialsGrid.tsx

import type { Testimonial } from '@/types/testimonial';
import { TestimonialCard } from './TestimonialCard';

type Props = {
  items: ReadonlyArray<Testimonial>;
};

export default function TestimonialsGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="font-ui text-sm" style={{ color: 'var(--color-muted)' }}>
        Aucun témoignage ne correspond à ce filtre.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
      {items.map((t, i) => (
        <TestimonialCard
          key={t.id}
          name={t.name}
          role={t.role}
          company={t.company}
          quote={t.quote}
          rating={t.rating}
          avatarUrl={t.avatarUrl}
          displayDate={t.displayDate}
          city={t.city}
          highlight={t.highlight}
          variant="default"
        />
      ))}
    </div>
  );
}
