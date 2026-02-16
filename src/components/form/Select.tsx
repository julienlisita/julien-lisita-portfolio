// src/components/form/Select.tsx

'use client';

import React from 'react';
import clsx from 'clsx';
import './Select.css';

type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  name: string;
  required?: boolean;
  options: Option[];
  defaultValue?: string | number;
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  label,
  name,
  required,
  options,
  defaultValue = -1, // valeur neutre fiable pour SSR
  className = '',
  ...props
}: SelectProps) {
  return (
    <label className={clsx('select-wrapper', className)}>
      {label && <span className="select-label">{label}</span>}

      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="select-input"
        {...props}
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
