// src/screens/admin/OffersAdmin.tsx

import { listJobOffers } from '@/server/services/job-offer.service';
import { upsertJobOfferAction, deleteJobOfferAction } from '@/app/admin/offers/actions';
import SubmitButton from '@/components/ui/SubmitButton';

export default async function OffersAdmin() {
  const offers = await listJobOffers();

  return (
    <div className="w-full space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-1">Offres d’emploi</h1>
        <p className="text-sm text-neutral-600">
          Gérer les offres affichées dans la section recrutement du site.
        </p>
      </header>

      {/* Création */}
      <section className="rounded-lg border bg-white p-4 sm:p-5 space-y-4">
        <h2 className="text-lg font-semibold">Créer une offre</h2>
        <form action={upsertJobOfferAction} className="grid gap-3">
          <input name="title" placeholder="Titre" required className="border rounded p-2" />
          <input
            name="location"
            placeholder="Localisation"
            required
            className="border rounded p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            className="border rounded p-2"
            rows={4}
          />
          <SubmitButton>Créer</SubmitButton>
        </form>
      </section>

      {/* Liste */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Liste des offres</h2>
        <ul className="space-y-3">
          {offers.map((o) => (
            <li key={o.id} className="rounded-lg border bg-white p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="font-semibold break-words">{o.title}</div>
                  <div className="text-sm text-gray-500">{o.location}</div>
                  <p className="mt-2 text-sm whitespace-pre-line break-words">{o.description}</p>
                </div>

                {/* Suppression */}
                <form action={deleteJobOfferAction} className="self-start">
                  <input type="hidden" name="id" value={o.id} />
                  <SubmitButton>Supprimer</SubmitButton>
                </form>
              </div>

              {/* Edition inline */}
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-blue-700">Modifier</summary>
                <form action={upsertJobOfferAction} className="mt-3 grid gap-3">
                  <input type="hidden" name="id" value={o.id} />
                  <input name="title" defaultValue={o.title} className="border rounded p-2" />
                  <input name="location" defaultValue={o.location} className="border rounded p-2" />
                  <textarea
                    name="description"
                    defaultValue={o.description}
                    className="border rounded p-2"
                    rows={4}
                  />
                  <SubmitButton>Enregistrer</SubmitButton>
                </form>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
