// src/data/services.ts

import type { FeatureItem } from '@/types/feature';

export const services: ReadonlyArray<FeatureItem> = [
  {
    icon: 'Home',
    title: 'Service 1',
    description:
      'Description générique du premier service. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    icon: 'Users',
    title: 'Service 2',
    description:
      'Description générique du deuxième service. Integer nec odio. Praesent libero. Sed cursus ante dapibus.',
  },
  {
    icon: 'Sparkles',
    title: 'Service 3',
    description:
      'Description générique du troisième service. Nulla quis sem at nibh elementum imperdiet.',
  },
  {
    icon: 'FileText',
    title: 'Service 4',
    description:
      'Description générique du quatrième service. Duis sagittis ipsum. Praesent mauris.',
  },
  {
    icon: 'Moon',
    title: 'Service 5',
    description:
      'Description générique du cinquième service. Fusce nec tellus sed augue semper porta.',
  },
  {
    icon: 'Handshake',
    title: 'Service 6',
    description:
      'Description générique du sixième service. Mauris massa. Vestibulum lacinia arcu eget nulla.',
  },
] as const;
