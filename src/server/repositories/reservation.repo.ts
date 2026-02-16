// src/server/repositories/reservation.repo.ts

import { prisma } from '@/lib/prisma';
import type { Reservation } from '@prisma/client';

export const reservationRepo = {
  async createFromPublic(input: {
    slotId: number;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    message?: string;
    clientIp?: string;
  }): Promise<Reservation> {
    return prisma.$transaction(async (tx) => {
      const now = new Date();

      const slot = await tx.reservationSlot.findUnique({
        where: { id: input.slotId },
      });

      // Vérification simple mais complète
      if (!slot || slot.status !== 'AVAILABLE' || slot.startAt < now) {
        console.warn('[reservationRepo.createFromPublic] slot invalid', {
          slotExists: !!slot,
          status: slot?.status,
          startAt: slot?.startAt,
          now,
        });
        throw new Error('Ce créneau n’est plus disponible.');
      }

      // Création de la réservation
      const reservation = await tx.reservation.create({
        data: {
          slotId: slot.id,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          clientPhone: input.clientPhone,
          message: input.message,
          clientIp: input.clientIp ?? null,
        },
      });

      // Mise à jour du slot
      await tx.reservationSlot.update({
        where: { id: slot.id },
        data: { status: 'BOOKED' },
      });

      return reservation;
    });
  },
  // Liste complète des réservations pour l’admin
  listAll(): Promise<(Reservation & { slot: { startAt: Date; endAt: Date | null } })[]> {
    return prisma.reservation.findMany({
      include: {
        slot: {
          select: { startAt: true, endAt: true, status: true, id: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  // Futures réservations
  listUpcoming(): Promise<(Reservation & { slot: { startAt: Date; endAt: Date | null } })[]> {
    const now = new Date();
    return prisma.reservation.findMany({
      where: {
        slot: { startAt: { gte: now } },
      },
      include: {
        slot: {
          select: { startAt: true, endAt: true, status: true, id: true },
        },
      },
      orderBy: { slot: { startAt: 'asc' } },
    });
  },

  // Annulation : on supprime la réservation + on remet le slot à AVAILABLE
  async cancel(id: number): Promise<Reservation> {
    return prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({
        where: { id },
      });

      if (!reservation) {
        throw new Error('RESERVATION_NOT_FOUND');
      }

      // On libère le créneau
      await tx.reservationSlot.update({
        where: { id: reservation.slotId },
        data: { status: 'AVAILABLE' },
      });

      // On supprime la réservation (tu pourrais aussi ajouter un champ "cancelledAt" plutôt que delete)
      const deleted = await tx.reservation.delete({
        where: { id },
      });

      return deleted;
    });
  },
  // Compter les réservations récentes pour une IP
  countRecentByIp(ip: string, since: Date): Promise<number> {
    return prisma.reservation.count({
      where: {
        clientIp: ip,
        createdAt: {
          gte: since,
        },
      },
    });
  },
};
