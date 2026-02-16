// src/app/admin/slots/actions.ts

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { fromZonedTime } from 'date-fns-tz';
import {
  createSlotAdmin,
  deleteSlotAdmin,
  setSlotStatusAdmin,
} from '@/server/services/reservations.service';
import { requireAdminApp } from '@/server/guards/requireAdmin.app';

const TZ = 'Europe/Paris';

const createSchema = z.object({
  startAt: z.string().min(1),
  endAt: z.string().min(1),
});

export async function createSlotAction(formData: FormData) {
  await requireAdminApp();

  const parsed = createSchema.safeParse({
    startAt: formData.get('startAt'),
    endAt: formData.get('endAt'),
  });

  if (!parsed.success) {
    console.error('[createSlotAction] invalid data', parsed.error.flatten());
    return;
  }

  const { startAt, endAt } = parsed.data;

  try {
    const startAtUtc = fromZonedTime(startAt, TZ);
    const endAtUtc = fromZonedTime(endAt, TZ);
    await createSlotAdmin({
      startAt: startAtUtc,
      endAt: endAtUtc,
    });
  } catch (err) {
    console.error('[createSlotAction] error', err);
  }

  revalidatePath('/admin/slots');
}

const statusSchema = z.object({
  slotId: z.coerce.number().int().positive(),
  status: z.enum(['AVAILABLE', 'BOOKED', 'DISABLED']),
});

export async function updateSlotStatusAction(formData: FormData) {
  await requireAdminApp();

  const parsed = statusSchema.safeParse({
    slotId: formData.get('slotId'),
    status: formData.get('status'),
  });

  if (!parsed.success) {
    console.error('[updateSlotStatusAction] invalid payload', parsed.error.flatten());
    return;
  }

  const { slotId, status } = parsed.data;

  try {
    await setSlotStatusAdmin(slotId, status);
  } catch (err) {
    if (err instanceof Error && err.message === 'SLOT_BOOKED_HAS_RESERVATION') {
      console.warn('[updateSlotStatusAction] refused to set AVAILABLE on a booked slot', slotId);
      return;
    }
    console.error('[updateSlotStatusAction] error', err);
  }

  revalidatePath('/admin/slots');
}

const deleteSchema = z.object({
  slotId: z.coerce.number().int().positive(),
});

export async function deleteSlotAction(formData: FormData) {
  await requireAdminApp();

  const parsed = deleteSchema.safeParse({
    slotId: formData.get('slotId'),
  });

  if (!parsed.success) {
    console.error('[deleteSlotAction] invalid payload', parsed.error.flatten());
    return;
  }

  const { slotId } = parsed.data;

  try {
    const ok = await deleteSlotAdmin(slotId);
    if (!ok) {
      console.warn('[deleteSlotAction] slot has an existing reservation, not deleted', slotId);
    }
  } catch (err) {
    console.error('[deleteSlotAction] error', err);
  }

  revalidatePath('/admin/slots');
}
