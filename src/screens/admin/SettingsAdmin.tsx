// src/screens/admin/SettingsAdmin.tsx

import { changePasswordAction, updateProfileAction } from '@/app/admin/settings/actions';

type SettingsAdminProps = {
  user: {
    id: number;
    name: string | null;
    email: string;
  };
};

export default function SettingsAdmin({ user }: SettingsAdminProps) {
  return (
    <div className="w-full space-y-6">
      <header>
        <h1 className="text-2xl font-bold mb-1">Paramètres du compte</h1>
        <p className="text-sm text-neutral-600">
          Gérez les informations de votre compte administrateur et votre mot de passe.
        </p>
      </header>

      {/* Profil */}
      <section className="border rounded-lg bg-white p-4 sm:p-5 space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold">Profil</h2>
        <p className="text-sm text-neutral-600">
          Modifiez votre nom et votre adresse email administrateur.
        </p>

        <form action={updateProfileAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name ?? ''}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={user.email}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-neutral-800"
          >
            Enregistrer les modifications
          </button>
        </form>
      </section>

      {/* Mot de passe */}
      <section className="border rounded-lg bg-white p-4 sm:p-5 space-y-4 max-w-xl">
        <h2 className="text-lg font-semibold">Sécurité</h2>
        <p className="text-sm text-neutral-600">
          Changez votre mot de passe admin. Veuillez saisir votre mot de passe actuel pour
          confirmer.
        </p>

        <form action={changePasswordAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
              Mot de passe actuel
            </label>
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              required
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
              Nouveau mot de passe
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              required
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-neutral-800"
          >
            Changer le mot de passe
          </button>
        </form>
      </section>
    </div>
  );
}
