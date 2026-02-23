// src/components/testimonials/NewTestimonialForm.tsx

'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import {
  submitTestimonialAction,
  type PublicTestimonialFormState,
} from '@/app/(site)/temoignages/new/actions';
import SubmitButton from '@/components/ui/SubmitButton';

const initialState: PublicTestimonialFormState = {};

export function NewTestimonialForm() {
  const router = useRouter();

  const [state, formAction] = useActionState(submitTestimonialAction, initialState);

  useEffect(() => {
    if (state?.ok && state.redirectTo) router.push(state.redirectTo);
  }, [state, router]);

  const err = (name: string) => state?.errors?.[name]?.[0];

  return (
    <form action={formAction} className="grid gap-3">
      {/* honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <input
          name="name"
          defaultValue={state?.values?.name}
          required
          className="border rounded p-2 w-full"
          placeholder="Votre nom"
        />
        {err('name') && <p className="text-sm text-red-600 mt-1">{err('name')}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="role"
          defaultValue={state?.values?.role}
          className="border rounded p-2"
          placeholder="Rôle"
        />
        <input
          name="company"
          defaultValue={state?.values?.company}
          className="border rounded p-2"
          placeholder="Entreprise"
        />
      </div>

      <div>
        <textarea
          name="quote"
          defaultValue={state?.values?.quote}
          required
          minLength={10}
          rows={4}
          className="border rounded p-2 w-full"
          placeholder="Votre témoignage"
        />
        {err('quote') && <p className="text-sm text-red-600 mt-1">{err('quote')}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          name="rating"
          type="number"
          step="0.5"
          min={0}
          max={5}
          defaultValue={state?.values?.rating}
          className="border rounded p-2"
          placeholder="Note (0–5)"
        />
        <input
          name="displayDate"
          defaultValue={state?.values?.displayDate}
          className="border rounded p-2"
          placeholder="Affichage date (ex: Août 2025)"
        />
        <input
          name="variant"
          defaultValue={state?.values?.variant}
          className="border rounded p-2"
          placeholder="Variante (default/compact/horizontal)"
        />
      </div>

      <input
        name="avatarUrl"
        type="url"
        defaultValue={state?.values?.avatarUrl}
        className="border rounded p-2"
        placeholder="Avatar URL (optionnel)"
      />

      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" name="consent" />
        J’autorise la publication de ce témoignage sur le site.
      </label>
      {err('consent') && <p className="text-sm text-red-600 mt-1">{err('consent')}</p>}

      <SubmitButton className="w-full sm:w-auto">Envoyer</SubmitButton>
    </form>
  );
}
