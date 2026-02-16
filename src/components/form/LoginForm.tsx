// src/components/form/LoginForm.tsx

'use client';

import Button from '../ui/Button';
import FloatingInput from '../form/FloatingInput';
import { loginAction } from '@/app/(site)/(auth)/login/actions';
import './LoginForm.css';

export default function LoginForm() {
  return (
    <form action={loginAction} className="login-form space-y-4">
      <FloatingInput label="Email" name="email" type="email" autoComplete="email" required />

      <FloatingInput
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      <div className="pt-2 text-center">
        <Button type="submit" variant="primary">
          Se connecter
        </Button>
      </div>
    </form>
  );
}
