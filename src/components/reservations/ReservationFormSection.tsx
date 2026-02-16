// src/components/reservations/ReservationFormSection.tsx

import clsx from 'clsx';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';
import type { ReservationSlot } from '@prisma/client';
import './ReservationFormSection.css';
import ReservationForm from './ReservationForm';

type ReservationFormSectionProps = {
  slots: ReadonlyArray<ReservationSlot>;
};

export default function ReservationFormSection({ slots }: ReservationFormSectionProps) {
  return (
    <Section className={clsx('reservation-form-section')}>
      <SectionWrapper>
        <HeaderBlock title="Formulaire de réservation" align="left" />

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
          <div className="max-w-2xl bg-bg">
            <ReservationForm slots={slots} />
          </div>

          <aside className="reservation-form-aside">
            <h3 className="text-lg font-semibold mb-2">Informations</h3>

            <p className="mb-3">
              Les créneaux présentés ci-dessous sont mis à jour en temps réel. Lors de l’envoi du
              formulaire, votre réservation est automatiquement enregistrée pour le créneau choisi.
            </p>

            <p className="mb-3">
              Vous recevrez ensuite un email récapitulatif contenant les détails de votre
              réservation.
            </p>

            <p className="text-sm text-neutral-700">
              Pour toute question ou modification, vous pouvez écrire à&nbsp;
              <strong>julien.lisita@gmail.com</strong>.
            </p>
          </aside>
        </div>
      </SectionWrapper>
    </Section>
  );
}
