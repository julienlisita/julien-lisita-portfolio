// src/data/contact.ts

import type { FeatureItem } from '@/types/feature';

export const contactInfos: ReadonlyArray<FeatureItem> = [
  {
    icon: 'Phone',
    title: 'Téléphone',
    description: '06 00 00 00 00',
    href: 'tel:+33600000000',
  },
  {
    icon: 'Mail',
    title: 'Email',
    description: 'contact@votresite.fr',
    href: 'mailto:contact@votresite.fr',
  },
  {
    icon: 'MapPin',
    title: 'Adresse',
    description: '12 rue des Lilas, 33000 Bordeaux',
    href: 'https://maps.app.goo.gl/yswPmSMAEhTruQsR7',
  },
] as const;
