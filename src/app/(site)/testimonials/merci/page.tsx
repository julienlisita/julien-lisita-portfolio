// src/app/(site)/temoignages/merci/page.tsx

export const metadata = {
  title: 'Merci pour votre témoignage',
};

export default function MerciTemoignagePage() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Merci !</h1>
      <p>
        Votre témoignage a bien été envoyé et sera relu par notre équipe avant publication. Encore
        merci pour votre confiance.
      </p>
    </div>
  );
}
