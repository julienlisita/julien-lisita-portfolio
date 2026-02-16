// src/components/data-display/TestimonialCard.tsx

'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import './TestimonialCard.css';

export type TestimonialCardProps = {
  name: string;
  role?: string; // ex: “Cliente”, “CEO @ Acme”
  company?: string; // ex: “Compagnie Care Services”
  quote: string;
  rating?: number; // 1..5 (peut être décimal: 4.5 -> arrondi à .5 visuel)
  avatarUrl?: string; // optionnel: /images/clients/lesly.jpg
  displayDate?: string; // ex: “Août 2025”
  city?: string;
  highlight?: boolean; // met la carte en avant
  variant?: 'default' | 'compact' | 'horizontal';
  className?: string;
};

export function TestimonialCard({
  name,
  role,
  company,
  quote,
  rating = 5,
  avatarUrl,
  displayDate,
  city,
  highlight = false,
  variant = 'default',
  className = '',
}: TestimonialCardProps) {
  const ariaRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(ariaRating);
  const hasHalf = ariaRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <figure
      className={[
        't-card',
        highlight ? 't-card--highlight' : '',
        variant === 'compact' ? 't-card--compact' : '',
        variant === 'horizontal' ? 't-card--horizontal' : '',
        className,
      ].join(' ')}
    >
      {/* rating */}
      <div className="t-rating" aria-label={`Note ${ariaRating} sur 5`}>
        <span className="sr-only">Note {ariaRating} sur 5</span>
        {/* full */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`f-${i}`} className="t-star t-star--full" aria-hidden="true" />
        ))}
        {/* half (dessin via masque CSS) */}
        {hasHalf && <Star className="t-star t-star--half" aria-hidden="true" />}
        {/* empty */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`e-${i}`} className="t-star t-star--empty" aria-hidden="true" />
        ))}
      </div>

      {/* quote */}
      <blockquote className="t-quote">
        <span aria-hidden="true" className="t-quote-mark">
          “
        </span>
        <p>{quote}</p>
      </blockquote>
      {/* header: avatar + identité */}
      <div className="t-card-head">
        {avatarUrl ? (
          <span className="t-avatar">
            <Image
              src={avatarUrl}
              alt={`Photo de ${name}`}
              fill
              sizes="48px"
              style={{ objectFit: 'cover' }}
            />
          </span>
        ) : (
          <span aria-hidden="true" className="t-avatar t-avatar--placeholder" />
        )}

        <figcaption className="t-id">
          <span className="t-name">{name}</span>
          {(role || company) && (
            <span className="t-meta">{[role, company].filter(Boolean).join(' · ')}</span>
          )}
          {(displayDate || city) && (
            <span className="t-date">{[city, displayDate].filter(Boolean).join(' · ')}</span>
          )}
        </figcaption>
      </div>
    </figure>
  );
}
