// src/app/(site)/layout.tsx

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeaderOffsetSync from '@/components/layout/HeaderOffsetSync';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <HeaderOffsetSync />
      <main className="flex-1" style={{ paddingTop: 'var(--header-offset)' }}>
        {children}
      </main>
      <div id="modal-root" />
      <Footer />
    </>
  );
}
