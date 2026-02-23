// src/screens/services/WebsiteCreationScreen.tsx

import Cta from '@/components/patterns/Cta';

export default function WebsiteCreationScreen() {
  return (
    <div>
      <Cta
        title="Parlons de vos besoins"
        description="Contactez-nous pour échanger sur votre situation et vos attentes."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
