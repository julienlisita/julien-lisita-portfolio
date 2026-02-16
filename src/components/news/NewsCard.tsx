//  src/components/news/NewsCard.tsx

'use client';

import React from 'react';
import './NewsCard.css';
import Image from 'next/image';
import Button from '../ui/Button';

type NewsCardProps = {
  title: string;
  description: string;
  displayDate?: string;
  source?: string;
  url?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export default function NewsCard({
  title,
  description,
  displayDate,
  source,
  url,
  imageUrl,
  imageAlt = title,
}: NewsCardProps) {
  return (
    <article className="news-card" aria-labelledby="news-title">
      {imageUrl && (
        <div className="news-card-image">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={320}
            height={240}
            sizes="(max-width: 640px) 100vw, 320px"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="news-card-content">
        <h3 id="news-title" className="news-card-title">
          {title}
        </h3>
        <p className="news-card-description">{description}</p>
        {(displayDate || source) && (
          <div className="news-card-meta">
            {source && <span className="news-card-source">{source}</span>}
            {displayDate && <span className="news-card-date">{displayDate}</span>}
          </div>
        )}
        {url && (
          <div className="news-card-actions">
            <Button
              href={url}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Lire l’article : ${title}`}
            >
              Lire l’article
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
