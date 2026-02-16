// src/components/form/FloatingTextArea.tsx

'use client';

import React from 'react';
import './FloatingTextarea.css';

type FloatingTextareaProps = {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  className?: string;
  /** message d’erreur (force l’état invalid) */
  error?: string;
  /** petit texte d’aide sous le champ */
  helperText?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FloatingTextarea({
  label,
  name,
  rows = 5,
  required = false,
  className = '',
  error,
  helperText,
  ...props
}: FloatingTextareaProps) {
  const helpId = helperText || error ? `${name}-help` : undefined;

  return (
    <div className={`floating-textarea-wrapper ${className}`}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder=" " /* nécessaire pour le label flottant */
        aria-invalid={!!error}
        aria-describedby={helpId}
        className={`floating-textarea ${error ? 'is-invalid' : ''}`}
        {...props}
      />
      <label htmlFor={name} className="floating-textarea-label">
        {label}
        {required ? ' *' : ''}
      </label>

      {(helperText || error) && (
        <p id={helpId} className={`floating-textarea-help ${error ? 'is-error' : ''}`}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
