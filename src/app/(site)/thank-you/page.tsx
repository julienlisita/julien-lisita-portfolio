// src/app/(site)/thank-you/page.tsx

import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Message envoyé – Nom de la société',
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-semibold text-black mb-4">Merci pour votre message !</h1>
      <p className="text-black/80 max-w-lg mb-4">
        Votre demande a bien été transmise à notre équipe. <br />
        Nous vous répondrons dans les plus brefs délais.
      </p>
      <Button href="/">Retour à l'accueil</Button>
    </main>
  );
}
