// src/app/(site)/gallery/page.tsx

import Gallery from '@/screens/Gallery';

export const metadata = {
  title: 'Galerie – Photos et visuels',
  description:
    'Parcourez notre galerie photo pour découvrir nos travaux, nos ambiances et les moments forts de nos projets ou événements.',
  alternates: {
    canonical: 'https://www.exemple.com/gallery',
  },
};

export default function GalleryPage() {
  return <Gallery />;
}
