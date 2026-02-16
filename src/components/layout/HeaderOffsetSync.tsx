// src/components/layout/HeaderOffsetSync.tsx

'use client';

import { useEffect } from 'react';

export default function HeaderOffsetSync() {
  useEffect(() => {
    const el = document.getElementById('site-header');
    if (!el) return;

    const set = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-offset', `${Math.round(h)}px`);
    };

    set();

    // observe resize (responsive + fonts + dynamic content)
    const ro = new ResizeObserver(() => set());
    ro.observe(el);

    // also update on window resize (safety)
    window.addEventListener('resize', set);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', set);
    };
  }, []);

  return null;
}
