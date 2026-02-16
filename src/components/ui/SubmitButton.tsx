// src/components/ui/SubmitButton.tsx

'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from './Button';

/**
 * SubmitButton ne doit JAMAIS rendre un lien.
 * On n'autorise donc que les props d'un <button> natif.
 */
type SubmitButtonProps = {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'>;

export default function SubmitButton({
  children,
  variant = 'primary',
  className,
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  // IMPORTANT : on passe uniquement des props de <button> à <Button>.
  // Aucune prop "lien" (href/target/rel/download) n'est permise par le type ci-dessus.
  return (
    <Button
      variant={variant}
      className={className}
      type="submit"
      disabled={pending}
      {...rest} // props strictement de <button>
    >
      {pending ? 'Envoi…' : children}
    </Button>
  );
}
