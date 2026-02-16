// src/app/(site)/reservations/page.tsx

import ReservationsScreen from '@/screens/ReservationsScreen';

export const metadata = {
  title: 'Réserver un créneau',
};

type ReservationsPageProps = {
  searchParams?: Promise<Record<string, string | string[]>>;
};

export default async function ReservationsPage({ searchParams }: ReservationsPageProps) {
  const resolved = (await searchParams) ?? {};

  const rawError = resolved.error;
  const errorKey =
    typeof rawError === 'string' ? rawError : Array.isArray(rawError) ? rawError[0] : undefined;

  let errorMessage: string | null = null;

  if (errorKey === 'too-many-requests') {
    errorMessage =
      "Vous venez déjà de faire une réservation. Pour éviter les abus, il faut patienter quelques minutes avant d'en envoyer une nouvelle.";
  } else if (errorKey === 'slot-unavailable') {
    errorMessage =
      'Le créneau que vous avez sélectionné n’est plus disponible. Merci de choisir un autre horaire.';
  }

  return <ReservationsScreen errorMessage={errorMessage} />;
}
