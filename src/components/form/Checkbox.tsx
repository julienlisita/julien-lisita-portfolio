// src/components/form/Checkbox.tsx

'use client';

import React from 'react';
import clsx from 'clsx';
import './Checkbox.css';

type CheckboxProps = {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({
  label,
  name,
  required = false,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <label className={clsx('checkbox-label', className)}>
      <input
        type="checkbox"
        name={name}
        id={name}
        required={required}
        className="checkbox-input"
        {...props}
      />
      <span className="checkbox-text">{label}</span>
    </label>
  );
}
