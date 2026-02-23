// src/screens/admin/ReservationsAdminScreen.tsx

import { listUpcomingReservationsAdmin } from '@/server/services/reservations.service';
import { cancelReservationAction } from '@/app/admin/reservations/actions';

function formatDateRange(start: Date, end?: Date | null) {
  const dStart = new Date(start);
  const dEnd = end ? new Date(end) : null;

  if (!dEnd) {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dStart);
  }

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).formatRange(dStart, dEnd);
}

export default async function ReservationsAdminScreen() {
  const reservations = await listUpcomingReservationsAdmin();

  return (
    <div className="w-full space-y-4">
      <header>
        <h1 className="text-2xl font-bold mb-1">Réservations</h1>
        <p className="text-sm text-neutral-600">
          Liste des réservations à venir. Vous pouvez annuler une réservation pour libérer le
          créneau.
        </p>
      </header>

      {reservations.length === 0 ? (
        <p className="text-sm text-neutral-500">Aucune réservation pour le moment.</p>
      ) : (
        <div className="rounded-lg border bg-white overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-3 py-2 text-left border-b">Créneau</th>
                <th className="px-3 py-2 text-left border-b">Client</th>
                <th className="px-3 py-2 text-left border-b">Contact</th>
                <th className="px-3 py-2 text-left border-b">Message</th>
                <th className="px-3 py-2 text-right border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-b last:border-b-0">
                  <td className="px-3 py-2 align-top">
                    {formatDateRange(r.slot.startAt, r.slot.endAt)}
                  </td>
                  <td className="px-3 py-2 align-top">
                    <div className="font-medium">{r.clientName}</div>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <div>{r.clientEmail}</div>
                    {r.clientPhone && (
                      <div className="text-xs text-neutral-600">{r.clientPhone}</div>
                    )}
                  </td>
                  <td className="px-3 py-2 align-top max-w-xs">
                    <p className="line-clamp-3 text-xs text-neutral-700">{r.message}</p>
                  </td>
                  <td className="px-3 py-2 align-top text-right">
                    <form action={cancelReservationAction}>
                      <input type="hidden" name="reservationId" value={r.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded border px-2 py-1 text-xs text-red-700 border-red-200 hover:bg-red-50"
                      >
                        Annuler
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
