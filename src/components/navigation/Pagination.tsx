// src/components/navigation/Pagination.tsx

'use client';

import clsx from 'clsx';
import './Pagination.css';

type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export default function Pagination({ page, totalPages, onPrev, onNext, className }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className={clsx('pagination', className)}>
      <button type="button" className="pagination__btn" onClick={onPrev} disabled={page <= 1}>
        Précédent
      </button>

      <span className="pagination__info">
        Page {page} / {totalPages}
      </span>

      <button
        type="button"
        className="pagination__btn"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Suivant
      </button>
    </div>
  );
}
