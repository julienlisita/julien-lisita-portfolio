// src/screens/RecruitmentScreen.tsx

import PageHero from '@/components/patterns/PageHero';
import RecruitmentClient from './RecruitmentClient';
import Cta from '@/components/patterns/Cta';
import { FileText } from 'lucide-react';
import { Suspense } from 'react';
import JobOffersSectionServer from '@/components/recruitment/JobOffersSectionServer';

export default function RecruitmentScreen() {
  return (
    <>
      <PageHero
        icon={<FileText size={40} />}
        title="Recrutement"
        subtitle="Découvrez nos opportunités et rejoignez une équipe engagée à vos côtés."
        align="center"
      />

      <JobOffersSectionServer />

      <Suspense fallback={<div>Chargement…</div>}>
        <RecruitmentClient />;
      </Suspense>

      <Cta
        title="Une question ou une candidature spontanée ?"
        description="Contactez-nous pour en savoir plus ou nous transmettre votre candidature."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </>
  );
}
