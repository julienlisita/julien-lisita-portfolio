// src/components/portfolio/ProjectCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import './ProjectCard.css';

export type ProjectCardProps = {
  slug: string; // pour la page interne
  title: string;
  summary: string; // description grand public
  imageUrl?: string;
  imageAlt?: string;
  kind?: string; // ex: "Application web", "Site vitrine", "Plateforme"
  highlight?: boolean;
  className?: string;
};

export function ProjectCard({
  slug,
  title,
  summary,
  imageUrl,
  imageAlt = title,
  kind,
  highlight = false,
  className = '',
}: ProjectCardProps) {
  return (
    <article
      className={['project-card', highlight ? 'project-card--highlight' : '', className].join(' ')}
    >
      {imageUrl && (
        <div className="project-card-image">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={640}
            height={400}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      <div className="project-card-content">
        {kind && <span className="project-card-kind">{kind}</span>}

        <h3 className="project-card-title">{title}</h3>

        <p className="project-card-summary">{summary}</p>

        <Link
          href={`/portfolio/${slug}`}
          className="project-card-link"
          aria-label={`Découvrir le projet ${title}`}
        >
          Découvrir le projet
        </Link>
      </div>
    </article>
  );
}
