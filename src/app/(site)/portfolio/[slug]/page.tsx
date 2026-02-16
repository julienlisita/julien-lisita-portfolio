// src/app/(site)/portfolio/[slug]/page.tsx

import Project from '@/screens/Project';
import { getPublicProjectBySlugServer } from '@/server/services/projects.server';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const project = await getPublicProjectBySlugServer(slug);

  if (!project) {
    return {
      title: 'Projet introuvable',
      description: "Ce projet n'existe pas ou n'est plus disponible.",
    };
  }

  return {
    title: `${project.title} — Projet`,
    description: project.summary,
    alternates: {
      canonical: `https://www.exemple.com/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImageUrl ? [project.coverImageUrl] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  return <Project slug={slug} />;
}
