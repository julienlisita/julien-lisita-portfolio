// src/app/layout.tsx

import './globals.css';
import { metadata } from './metadata';
export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
