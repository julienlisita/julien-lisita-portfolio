// src/components/ui/Radio.tsx

'use client';

import React from 'react';
import clsx from 'clsx';
import './Radio.css';

type RadioProps = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  required?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Radio({
  label,
  name,
  value,
  checked,
  required = false,
  className = '',
  ...props
}: RadioProps) {
  return (
    <label className={clsx('radio-label', className)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        required={required}
        className="radio-input"
        {...props}
      />
      <span className="radio-text">{label}</span>
    </label>
  );
}
