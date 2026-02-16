// src/components/reservations/ReservationSectionServer.tsx

import { getAvailableSlotsServer } from '@/server/services/reservations.server';
import ReservationFormSection from './ReservationFormSection';

export default async function ReservationSectionServer() {
  const slots = await getAvailableSlotsServer();
  return <ReservationFormSection slots={slots} />;
}
