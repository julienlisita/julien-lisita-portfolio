// src/components/form/FloatingInput.tsx

'use client';

import React from 'react';
import './FloatingInput.css';

type FloatingInputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  /** message d’erreur (affiche l’état invalid) */
  error?: string;
  /** petit texte d’aide sous le champ */
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FloatingInput({
  label,
  name,
  type = 'text',
  required = false,
  className = '',
  error,
  helperText,
  ...props
}: FloatingInputProps) {
  return (
    <div className={`floating-input-wrapper ${className}`}>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        placeholder=" " /* nécessaire pour l’effet floating */
        aria-invalid={!!error}
        aria-describedby={helperText ? `${name}-help` : undefined}
        className={`floating-input peer ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      <label htmlFor={name} className="floating-input-label">
        {label}
        {required ? ' *' : ''}
      </label>

      {(helperText || error) && (
        <p id={`${name}-help`} className={`floating-input-help ${error ? 'is-error' : ''}`}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
