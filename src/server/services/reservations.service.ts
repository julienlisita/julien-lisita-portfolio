// src/server/services/reservations.service.ts

import { reservationSlotRepo } from '../repositories/reservationSlot.repo';
import { reservationRepo } from '../repositories/reservation.repo';
import type { SlotStatus } from '@prisma/client';

/* -----------------------------------------------------------------------------
 * PUBLIC
 * ---------------------------------------------------------------------------*/

/**
 * Liste des créneaux disponibles côté public.
 * - status = AVAILABLE
 * - startAt >= maintenant
 * - aucun Reservation liée (géré dans reservationSlotRepo.listAvailable)
 */
export const listAvailableSlots = () => reservationSlotRepo.listAvailable();

/**
 * Création de réservation (version "brute", utilisée par la version safe).
 */
export const createReservationFromPublic = (
  input: Parameters<typeof reservationRepo.createFromPublic>[0]
) => reservationRepo.createFromPublic(input);

/**
 * Version "safe" pour la server action publique :
 * - ne laisse pas remonter une exception non gérée vers Next
 * - renvoie un objet { ok, reason? } interprétable par l'action
 */
export const createReservationFromPublicSafe = async (
  input: Parameters<typeof reservationRepo.createFromPublic>[0]
): Promise<{ ok: boolean; reason?: 'slot-unavailable' | 'unknown-error' }> => {
  try {
    await reservationRepo.createFromPublic(input);
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.message === 'Ce créneau n’est plus disponible.') {
      console.warn('[reservations] slot unavailable in createReservationFromPublicSafe', {
        slotId: input.slotId,
      });
      return { ok: false, reason: 'slot-unavailable' };
    }

    console.error('[reservations] unexpected error in createReservationFromPublicSafe', err);
    return { ok: false, reason: 'unknown-error' };
  }
};

export const getSlotById = (id: number) => reservationSlotRepo.findById(id);

/* -----------------------------------------------------------------------------
 * ADMIN - SLOTS
 * ---------------------------------------------------------------------------*/

/**
 * Liste complète des créneaux pour l'admin.
 */
export const listAllSlotsAdmin = () => reservationSlotRepo.listAll();

/**
 * Création d'un créneau par l'admin.
 */
export const createSlotAdmin = (data: { startAt: Date; endAt: Date }) =>
  reservationSlotRepo.create({
    startAt: data.startAt,
    endAt: data.endAt,
  });

/**
 * Mise à jour du statut d'un créneau.
 *
 * Règle métier :
 * - Si le slot est BOOKED, on interdit tout changement de statut ici.
 *   → Il faut passer par l'annulation de la réservation (cancelReservationAdmin),
 *     qui remettra le slot en AVAILABLE proprement.
 */
export const setSlotStatusAdmin = async (id: number, status: SlotStatus) => {
  const slot = await reservationSlotRepo.findById(id);

  if (!slot) {
    console.warn('[setSlotStatusAdmin] slot not found', id);
    throw new Error('SLOT_NOT_FOUND');
  }

  if (slot.status === 'BOOKED' && status !== 'BOOKED') {
    console.warn('[setSlotStatusAdmin] attempt to change status on a booked slot - refused', {
      id,
      currentStatus: slot.status,
      requested: status,
    });
    throw new Error('SLOT_BOOKED_HAS_RESERVATION');
  }

  return reservationSlotRepo.updateStatus(id, status);
};

/**
 * Suppression d'un créneau s'il n'a pas de réservation.
 * Renvoie true si supprimé, false si non (réservation existante).
 */
export const deleteSlotAdmin = (id: number) => reservationSlotRepo.deleteIfNoReservation(id);

/* -----------------------------------------------------------------------------
 * ADMIN - RESERVATIONS
 * ---------------------------------------------------------------------------*/

/**
 * Liste toutes les réservations (admin).
 */
export const listAllReservationsAdmin = () => reservationRepo.listAll();

/**
 * Liste seulement les réservations à venir (admin).
 */
export const listUpcomingReservationsAdmin = () => reservationRepo.listUpcoming();

/**
 * Annule une réservation :
 * - supprime la réservation
 * - repasse le créneau associé à AVAILABLE
 */
export const cancelReservationAdmin = (id: number) => reservationRepo.cancel(id);

const RESERVATION_RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

export async function isReservationRateLimited(ip: string | undefined | null): Promise<boolean> {
  if (!ip) {
    // Pas d'IP fiable → on ne bloque pas, mais on log
    console.warn('[isReservationRateLimited] IP manquante, rate-limit non appliquée');
    return false;
  }

  const since = new Date(Date.now() - RESERVATION_RATE_LIMIT_WINDOW_MS);
  const count = await reservationRepo.countRecentByIp(ip, since);

  return count >= 1; // 1 réservation max / fenêtre
}
