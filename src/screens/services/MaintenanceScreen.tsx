// src/screens/services/MaintenanceScreen.tsx

import Cta from '@/components/patterns/Cta';

export default function MaintenanceScreen() {
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
