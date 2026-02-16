// src/app/(site)/(auth)/login/page.tsx

import Login from '@/screens/Login';

export const metadata = {
  title: 'Connexion administrateur – Nom du site',
  description: "Accédez à l'espace administrateur pour gérer le site.",
};

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[]>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolved = (await searchParams) ?? {};

  const rawError = resolved.error;

  const error =
    typeof rawError === 'string' ? rawError : Array.isArray(rawError) ? rawError[0] : undefined;

  return <Login errorKey={error} />;
}
