// src/components/form/FileUpload.tsx

'use client';

import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import './FileUpload.css';

type FileUploadProps = {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
  droppable?: boolean; // activer la zone drag & drop
  className?: string;
  onFileChange?: (file: File | null) => void;
};

export default function FileUpload({
  label,
  name,
  accept,
  required = false,
  disabled = false,
  helperText,
  errorText,
  droppable = false,
  className,
  onFileChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const pickFile = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    onFileChange?.(f);
  };

  const clearFile = () => {
    if (inputRef.current) inputRef.current.value = '';
    setFile(null);
    onFileChange?.(null);
  };

  // Drag & drop handlers
  const onDragOver = (e: React.DragEvent) => {
    if (!droppable || disabled) return;
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => {
    if (!droppable || disabled) return;
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    if (!droppable || disabled) return;
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    if (f) {
      setFile(f);
      onFileChange?.(f);
    }
  };

  return (
    <div className={clsx('file-upload', className)}>
      <label className="file-upload__label" htmlFor={name}>
        {label}
        {required && (
          <span aria-hidden className="file-upload__required">
            *
          </span>
        )}
      </label>

      {/* Zone interactive */}
      <div
        className={clsx(
          'file-upload__dropzone',
          droppable && 'is-droppable',
          isDragging && 'is-dragging',
          disabled && 'is-disabled'
        )}
        onClick={!disabled ? pickFile : undefined}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role={droppable ? 'button' : undefined}
        tabIndex={droppable ? 0 : -1}
        aria-disabled={disabled || undefined}
      >
        {/* input natif masqué */}
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="file"
          accept={accept}
          required={required}
          disabled={disabled}
          className="file-upload__input"
          onChange={handleChange}
        />

        <div className="file-upload__content">
          {file ? (
            <>
              <span className="file-upload__filename">{file.name}</span>
              <button
                type="button"
                className="file-upload__clear"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
              >
                Retirer
              </button>
            </>
          ) : (
            <>
              {droppable ? (
                <span className="file-upload__hint">
                  Glissez votre fichier ici ou <strong>cliquez pour choisir</strong>
                </span>
              ) : (
                <span className="file-upload__hint">
                  <strong>Choisir un fichier</strong>
                </span>
              )}
              {accept && <span className="file-upload__accept">Formats : {accept}</span>}
            </>
          )}
        </div>
      </div>

      {/* Helper / Error */}
      {errorText ? (
        <p className="file-upload__error" role="alert">
          {errorText}
        </p>
      ) : helperText ? (
        <p className="file-upload__helper">{helperText}</p>
      ) : null}
    </div>
  );
}
