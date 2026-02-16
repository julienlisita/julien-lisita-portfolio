// src/app/(site)/news/page.tsx

import NewsScreen from '@/screens/NewsScreen';

export const metadata = {
  title: 'Actualités',
  description:
    'Actualités ou publications de l’entreprise. Cette page peut contenir des articles internes, des liens externes, ou évoluer vers un blog complet.',
  alternates: {
    canonical: 'https://www.exemple.com/news',
  },
};

export default function NewsPage() {
  return <NewsScreen />;
}
