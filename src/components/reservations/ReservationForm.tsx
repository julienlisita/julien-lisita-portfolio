// src/components/reservations/ReservationForm.tsx

'use client';

import { useMemo, useState } from 'react';
import type { ReservationSlot } from '@prisma/client';

import Button from '../ui/Button';
import FloatingInput from '../form/FloatingInput';
import FloatingTextarea from '../form/FloatingTextarea';

import { sendReservation } from '@/app/(site)/reservations/actions';
import './ReservationForm.css';
import Radio from '../form/Radio';

type ReservationFormProps = {
  slots: ReadonlyArray<ReservationSlot>;
  ctaAlign?: 'left' | 'center' | 'right';
  className?: string;
};

// --- Helpers date/time (local timezone) ---
function toDateKey(d: Date) {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d);

  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function formatDayTitle(dateKey: string) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(dt);
}

function formatTime(d: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

function isMorning(slot: ReservationSlot) {
  const d = new Date(slot.startAt);

  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(d);

  const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '0';
  const hour = parseInt(hourStr, 10);

  return hour < 12;
}

export default function ReservationForm({
  slots,
  ctaAlign = 'left',
  className,
}: ReservationFormProps) {
  const alignClass =
    ctaAlign === 'center'
      ? 'text-center lg:text-center'
      : ctaAlign === 'right'
        ? 'text-center lg:text-right'
        : 'text-center lg:text-left';

  // Group slots by day + sort by time
  const grouped = useMemo(() => {
    const map = new Map<string, ReservationSlot[]>();

    for (const s of slots) {
      const key = toDateKey(new Date(s.startAt));
      const arr = map.get(key) ?? [];
      arr.push(s);
      map.set(key, arr);
    }

    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => +new Date(a.startAt) - +new Date(b.startAt));
      map.set(k, arr);
    }

    const keys = Array.from(map.keys()).sort(); // chronological (yyyy-mm-dd)
    return { map, keys };
  }, [slots]);

  const [openDay, setOpenDay] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const DAYS_STEP = 5; // nombre de jours ajoutés à chaque clic (à ajuster)
  const [visibleDaysCount, setVisibleDaysCount] = useState(DAYS_STEP);

  const visibleDayKeys = grouped.keys.slice(0, visibleDaysCount);
  const remainingDays = Math.max(0, grouped.keys.length - visibleDaysCount);
  const hasMoreDays = remainingDays > 0;

  return (
    <form
      name="reservation"
      action={sendReservation}
      className={`reservation-form ${className ?? ''}`}
    >
      {/* Honeypot */}
      <input
        type="text"
        hidden
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Créneau souhaité (accordion Doctolib + Matin/Après-midi) */}
      <div className="mb-4">
        <span className="block mb-2 font-medium">Créneau souhaité</span>

        {visibleDayKeys.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-600">Aucun créneau disponible pour le moment.</p>
        ) : (
          <div className="slot-accordion" role="list">
            {visibleDayKeys.map((dayKey) => {
              const isOpen = openDay === dayKey;
              const daySlots = grouped.map.get(dayKey) ?? [];
              const count = daySlots.length;

              const morningSlots = daySlots.filter(isMorning);
              const afternoonSlots = daySlots.filter((s) => !isMorning(s));

              return (
                <div
                  key={dayKey}
                  className={`slot-accordion__item ${isOpen ? 'is-open' : ''}`}
                  role="listitem"
                >
                  <button
                    type="button"
                    className="slot-accordion__trigger"
                    onClick={() => {
                      setOpenDay(isOpen ? null : dayKey);
                      setSelectedSlotId(null); // comme Doctolib : on re-choisit une heure
                    }}
                    aria-expanded={isOpen}
                  >
                    <div className="slot-accordion__trigger-left">
                      <span className="slot-accordion__day">{formatDayTitle(dayKey)}</span>
                      <span className="slot-accordion__meta">{count} créneau(x)</span>
                    </div>

                    <span className="slot-accordion__chevron" aria-hidden>
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="slot-accordion__panel">
                      {/* MATIN */}
                      {morningSlots.length > 0 && (
                        <div className="slot-accordion__group">
                          <div className="slot-accordion__group-title">Matin</div>
                          <div className="slot-accordion__times">
                            {morningSlots.map((s) => {
                              const start = new Date(s.startAt);
                              const active = selectedSlotId === s.id;

                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  className={`slot-accordion__time ${active ? 'is-active' : ''}`}
                                  onClick={() => setSelectedSlotId(s.id)}
                                  aria-pressed={active}
                                >
                                  {formatTime(start)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* APRÈS-MIDI */}
                      {afternoonSlots.length > 0 && (
                        <div className="slot-accordion__group">
                          <div className="slot-accordion__group-title">Après-midi</div>
                          <div className="slot-accordion__times">
                            {afternoonSlots.map((s) => {
                              const start = new Date(s.startAt);
                              const active = selectedSlotId === s.id;

                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  className={`slot-accordion__time ${active ? 'is-active' : ''}`}
                                  onClick={() => setSelectedSlotId(s.id)}
                                  aria-pressed={active}
                                >
                                  {formatTime(start)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Si jamais un jour a 0 slot (rare si data propre) */}
                      {daySlots.length === 0 && (
                        <p className="mt-2 text-sm text-neutral-600">
                          Aucun créneau pour cette date.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {hasMoreDays && (
              <div className="slot-accordion__more">
                <button
                  type="button"
                  className="slot-accordion__more-btn"
                  onClick={() =>
                    setVisibleDaysCount((n) => Math.min(grouped.keys.length, n + DAYS_STEP))
                  }
                >
                  Voir plus de dates
                </button>
              </div>
            )}
            {/* slotId envoyé au server action */}
            <input type="hidden" name="slotId" value={selectedSlotId ?? ''} />
          </div>
        )}
      </div>

      {/* Civilité */}
      <div className="mb-4">
        <span className="block mb-2 font-medium">Civilité</span>
        <div className="flex flex-wrap gap-6">
          <Radio name="civilite" value="Mme" label="Mme" />
          <Radio name="civilite" value="M." label="M." />
        </div>
      </div>

      {/* Prénom / Nom */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FloatingInput label="Prénom" name="prenom" type="text" required />
        <FloatingInput label="Nom" name="nom" type="text" required />
      </div>

      <FloatingInput label="Email" name="email" type="email" required />
      <FloatingInput label="Téléphone" name="telephone" type="tel" />

      <FloatingTextarea
        label="Message (optionnel)"
        name="message"
        placeholder="Précisez votre objectif, vos disponibilités ou votre niveau actuel."
      />

      <div className={alignClass}>
        <Button type="submit" variant="primary" disabled={slots.length === 0 || !selectedSlotId}>
          {slots.length === 0
            ? 'Aucun créneau disponible'
            : !selectedSlotId
              ? 'Choisir un créneau'
              : 'Envoyer la réservation'}
        </Button>
      </div>
    </form>
  );
}
