// src/screens/admin/TestimonialsAdmin.tsx

import { listAllTestimonials } from '@/server/services/testimonials.service';
import {
  publishTestimonialAction,
  unpublishTestimonialAction,
  toggleHighlightAction,
  updateTestimonialAction,
  deleteTestimonialAction,
} from '@/app/admin/testimonials/actions';
import SubmitButton from '@/components/ui/SubmitButton';

export default async function TestimonialsAdmin() {
  const items = await listAllTestimonials();

  return (
    <div className="w-full space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-1">Témoignages</h1>
        <p className="text-sm text-neutral-600">
          Gérez les témoignages affichés sur le site et mettez-en certains en avant.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Liste</h2>

        <ul className="space-y-4">
          {items.map((t) => (
            <li key={t.id} className="rounded-lg border bg-white p-4 sm:p-5">
              {/* Contenu + actions */}
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                <div className="min-w-0">
                  <div className="font-semibold break-words">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t.displayDate ?? '—'} · {t.isPublished ? 'Publié' : 'Brouillon'} ·{' '}
                    {t.highlight ? '★ Mis en avant' : '—'}
                  </div>
                  <p className="mt-2 text-sm whitespace-pre-line break-words">{t.quote}</p>
                </div>

                <div className="sm:justify-self-end flex flex-wrap gap-2">
                  <form action={toggleHighlightAction} className="w-full sm:w-auto">
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="value" value={(!t.highlight).toString()} />
                    <SubmitButton className="w-full sm:w-auto">
                      {t.highlight ? "Retirer de l'avant" : 'Mettre en avant'}
                    </SubmitButton>
                  </form>

                  {t.isPublished ? (
                    <form action={unpublishTestimonialAction} className="w-full sm:w-auto">
                      <input type="hidden" name="id" value={t.id} />
                      <SubmitButton className="w-full sm:w-auto">Dépublier</SubmitButton>
                    </form>
                  ) : (
                    <form action={publishTestimonialAction} className="w-full sm:w-auto">
                      <input type="hidden" name="id" value={t.id} />
                      <SubmitButton className="w-full sm:w-auto">Publier</SubmitButton>
                    </form>
                  )}

                  <form action={deleteTestimonialAction} className="w-full sm:w-auto">
                    <input type="hidden" name="id" value={t.id} />
                    <SubmitButton className="w-full sm:w-auto">Supprimer</SubmitButton>
                  </form>
                </div>
              </div>

              {/* Édition inline */}
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-blue-700">Modifier</summary>

                <form action={updateTestimonialAction} className="mt-3 grid gap-3">
                  <input type="hidden" name="id" value={t.id} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="name"
                      defaultValue={t.name}
                      className="border rounded p-2"
                      placeholder="Nom"
                    />
                    <input
                      name="role"
                      defaultValue={t.role ?? ''}
                      className="border rounded p-2"
                      placeholder="Rôle"
                    />
                    <input
                      name="company"
                      defaultValue={t.company ?? ''}
                      className="border rounded p-2"
                      placeholder="Entreprise"
                    />
                    <input
                      name="avatarUrl"
                      defaultValue={t.avatarUrl ?? ''}
                      className="border rounded p-2"
                      placeholder="Avatar URL"
                    />
                    <input
                      name="displayDate"
                      defaultValue={t.displayDate ?? ''}
                      className="border rounded p-2"
                      placeholder="Affichage date"
                    />
                    <input
                      name="variant"
                      defaultValue={t.variant ?? ''}
                      className="border rounded p-2"
                      placeholder="Variante"
                    />
                    <input
                      name="rating"
                      type="number"
                      step="0.5"
                      min="0"
                      max="5"
                      defaultValue={t.rating ? Number(t.rating) : 0}
                      className="border rounded p-2"
                      placeholder="Note (0–5)"
                    />
                    <label className="inline-flex items-center gap-2 text-sm border rounded p-2">
                      <input type="checkbox" name="highlight" defaultChecked={t.highlight} />
                      Mettre en avant
                    </label>
                  </div>

                  <textarea
                    name="quote"
                    defaultValue={t.quote}
                    rows={4}
                    className="border rounded p-2"
                    placeholder="Témoignage"
                  />

                  <SubmitButton className="w-full sm:w-auto">Enregistrer</SubmitButton>
                </form>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
