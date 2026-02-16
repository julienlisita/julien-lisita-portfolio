// src/app/(site)/(auth)/signup/page.tsx

import { signupAction } from './actions';

export default function SignupPage() {
  return (
    <form action={signupAction} className="space-y-4 max-w-sm">
      <input name="name" placeholder="Nom" className="border p-2 w-full" />
      <input name="email" type="email" placeholder="Email" required className="border p-2 w-full" />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        required
        className="border p-2 w-full"
      />
      <button type="submit" className="border p-2">
        Créer le compte
      </button>
    </form>
  );
}
