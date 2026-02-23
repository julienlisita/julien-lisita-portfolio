// src/screens/admin/SlotsAdminScreen.tsx

import { listAllSlotsAdmin } from '@/server/services/reservations.service';
import {
  createSlotAction,
  deleteSlotAction,
  updateSlotStatusAction,
} from '@/app/admin/slots/actions';

const TZ = 'Europe/Paris';

function formatSlot(start: Date, end?: Date | null) {
  const dStart = new Date(start);
  const dEnd = end ? new Date(end) : null;

  const fmt = new Intl.DateTimeFormat('fr-FR', {
    timeZone: TZ,
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (!dEnd) {
    return fmt.format(dStart);
  }

  return fmt.formatRange(dStart, dEnd);
}

export default async function SlotsAdminScreen() {
  const slots = await listAllSlotsAdmin();

  return (
    <div className="w-full space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Créneaux</h1>
        <p className="text-sm text-neutral-600">
          Créez, désactivez ou supprimez des créneaux de réservation. Un créneau avec une
          réservation ne peut pas être supprimé.
        </p>
      </header>

      <section className="rounded-lg border bg-white p-4 sm:p-5 space-y-4">
        <h2 className="text-lg font-semibold">Ajouter un créneau</h2>

        <form action={createSlotAction} className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-medium mb-1">Début</label>
            <input
              type="datetime-local"
              name="startAt"
              required
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Fin</label>
            <input
              type="datetime-local"
              name="endAt"
              required
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 text-sm rounded bg-slate-900 text-white hover:bg-slate-800"
          >
            Ajouter un créneau
          </button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Liste des créneaux</h2>

        {slots.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucun créneau pour le moment.</p>
        ) : (
          <div className="rounded-lg border bg-white overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-3 py-2 text-left border-b">Créneau</th>
                  <th className="px-3 py-2 text-left border-b">Statut</th>
                  <th className="px-3 py-2 text-right border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot.id} className="border-b last:border-b-0">
                    <td className="px-3 py-2 align-top">{formatSlot(slot.startAt, slot.endAt)}</td>
                    <td className="px-3 py-2 align-top">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs border">
                        {slot.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-right space-x-2">
                      <form action={updateSlotStatusAction} className="inline">
                        <input type="hidden" name="slotId" value={slot.id} />
                        <input type="hidden" name="status" value="AVAILABLE" />
                        <button
                          type="submit"
                          className="px-2 py-1 text-xs rounded border border-green-200 text-green-700 hover:bg-green-50"
                        >
                          Disponible
                        </button>
                      </form>

                      <form action={updateSlotStatusAction} className="inline">
                        <input type="hidden" name="slotId" value={slot.id} />
                        <input type="hidden" name="status" value="DISABLED" />
                        <button
                          type="submit"
                          className="px-2 py-1 text-xs rounded border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                        >
                          Désactiver
                        </button>
                      </form>

                      <form action={deleteSlotAction} className="inline">
                        <input type="hidden" name="slotId" value={slot.id} />
                        <button
                          type="submit"
                          className="px-2 py-1 text-xs rounded border border-red-200 text-red-700 hover:bg-red-50"
                        >
                          Supprimer
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
