// src/app/(site)/thank-you-application/page.tsx

import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Candidature envoyée – Nom de la société',
};

export default function ThankYouApplicationPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-semibold text-black mb-4">Merci pour votre candidature !</h1>
      <p className="text-black/80 max-w-lg mb-4">
        Votre profil a bien été transmis à notre équipe. <br />
        Si votre candidature correspond à nos besoins actuels, nous vous contacterons rapidement.
      </p>
      <Button href="/">Retour à l'accueil</Button>
    </main>
  );
}
