// src/screens/ReservationsScreen.tsx

import Cta from '@/components/patterns/Cta';
import PageHero from '@/components/patterns/PageHero';
import ReservationSectionServer from '@/components/reservations/ReservationSectionServer';
import { AlertTriangle, Calendar } from 'lucide-react';

type ReservationsProps = {
  errorMessage?: string | null;
};

export default function ReservationsScreen({ errorMessage }: ReservationsProps) {
  return (
    <div>
      {/* Hero */}
      <PageHero
        icon={<Calendar size={40} />}
        title="Réserver un créneau"
        subtitle="Choisissez un créneau disponible et finalisez votre réservation en quelques secondes."
        align="center"
      />

      {/* Alerte d’erreur */}
      {errorMessage && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex items-start gap-3 rounded-lg border border-orange-300 bg-orange-50 px-4 py-3 text-sm text-orange-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Section réservations */}
      <div className={errorMessage ? 'mt-8' : ''}>
        <ReservationSectionServer />
      </div>

      {/* CTA */}
      <Cta
        title="Besoin d’un renseignement ?"
        description="Contactez-nous pour toute question ou demande particulière avant de réserver."
        align="left"
        primaryLabel="Nous contacter"
        primaryHref="/contact"
      />
    </div>
  );
}
