// src/screens/LoginScreen.tsx

import { Lock } from 'lucide-react';
import PageHero from '@/components/patterns/PageHero';
import LoginForm from '@/components/form/LoginForm';

type LoginProps = {
  errorKey?: string;
};

export default function LoginScreen({ errorKey }: LoginProps) {
  let errorMessage: string | null = null;

  if (errorKey === 'invalid-credentials') {
    errorMessage = 'Email ou mot de passe incorrect.';
  } else if (errorKey === 'unknown') {
    errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
  }

  return (
    <>
      <PageHero
        icon={<Lock size={40} />}
        title="Espace administrateur"
        subtitle="Connectez-vous pour accéder au back-office et gérer le contenu du site."
        align="center"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="
            max-w-md mx-auto
            rounded-xl shadow-sm
            p-6 sm:p-8
            border
          "
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
        >
          <h2
            className="text-lg font-semibold mb-2 text-center"
            style={{ color: 'var(--color-heading)' }}
          >
            Connexion administrateur
          </h2>

          <p className="text-sm mb-6 text-center" style={{ color: 'var(--color-muted)' }}>
            Cet espace est réservé aux administrateurs du site.
          </p>

          {errorMessage && (
            <div
              className="mb-4 rounded px-3 py-2 text-sm"
              role="alert"
              style={{
                border: '1px solid color-mix(in oklab, var(--color-input-error) 30%, transparent)',
                backgroundColor: 'color-mix(in oklab, var(--color-input-error) 12%, transparent)',
                color: 'var(--color-input-error)',
              }}
            >
              {errorMessage}
            </div>
          )}

          <LoginForm />
        </div>
      </main>
    </>
  );
}
