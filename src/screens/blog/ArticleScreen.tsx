// src/screens/blog/ArticleScreen.tsx

import Cta from '@/components/patterns/Cta';

export default function ArticleScreen() {
  return (
    <div>
      <Cta
        title="Envie d’échanger avec nous ?"
        description="Notre équipe est disponible pour répondre à vos questions et discuter de vos besoins."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
