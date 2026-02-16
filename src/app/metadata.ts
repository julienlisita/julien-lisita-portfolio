// app/metadata.ts

export const metadata = {
  title: 'Site Vitrine – Titre de votre entreprise',
  description:
    'Site vitrine professionnel pour mettre en valeur votre activité. Modèle personnalisable pour indépendants, TPE ou entreprises.',
  metadataBase: new URL('https://www.exemple.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Titre de votre entreprise',
    description: 'Présentez votre entreprise avec un site moderne, clair et responsive.',
    url: 'https://www.exemple.com',
    type: 'website',
    images: [
      {
        url: 'https://www.exemple.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Titre de votre entreprise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titre de votre entreprise',
    description: 'Site vitrine professionnel pour votre activité.',
    images: ['https://www.exemple.com/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
};
