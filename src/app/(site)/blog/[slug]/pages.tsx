// src/app/(site)/blog/[slug]/page.tsx

import ArticleScreen from '@/screens/blog/ArticleScreen';

export const metadata = {
  title: 'À propos – Votre Nom',
  description:
    'En savoir plus sur notre entreprise, nos valeurs, et notre engagement envers nos clients.',
  alternates: {
    canonical: 'https://www.exemple.com/blog',
  },
};

export default function ArticlePage() {
  return <ArticleScreen />;
}
