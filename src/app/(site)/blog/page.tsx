// src/app/(site)/blog/page.tsx

import BlogScreen from '@/screens/blog/BlogScreen';

export const metadata = {
  title: 'À propos – Votre Nom',
  description:
    'En savoir plus sur notre entreprise, nos valeurs, et notre engagement envers nos clients.',
  alternates: {
    canonical: 'https://www.exemple.com/blog',
  },
};

export default function BlogPage() {
  return <BlogScreen />;
}
