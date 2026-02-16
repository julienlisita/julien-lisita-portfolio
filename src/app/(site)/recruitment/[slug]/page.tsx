// app/recruitment/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { jobOffers } from '@/data/jobOffers';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Metadata } from 'next';

import JobOffer from '@/screens/JobOffer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = jobOffers.find((o) => o.slug === slug);

  // --- Offre introuvable ---
  if (!offer) {
    return {
      title: 'Offre d’emploi non trouvée',
      description:
        'Cette offre d’emploi n’existe pas ou n’est plus disponible. Consultez nos autres opportunités en ligne.',
      alternates: {
        canonical: `/recruitment/${slug}`,
      },
    };
  }

  const pubDate = format(new Date(offer.publishedAt), 'd MMMM yyyy', { locale: fr });

  // --- Offre valide ---
  return {
    title: `${offer.title} – Offre d’emploi`,
    description: `${offer.title} à ${offer.location} (${offer.contractType}). Offre publiée le ${pubDate}. Consultez le détail du poste et postulez en ligne.`,
    alternates: {
      canonical: `/recruitment/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return jobOffers.map((o) => ({ slug: o.slug }));
}

export const revalidate = 0;

export default async function JobOfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offer = jobOffers.find((o) => o.slug === slug);

  if (!offer) return notFound();

  return <JobOffer offer={offer} />;
}
