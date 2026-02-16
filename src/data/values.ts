// src/data/values.ts

import type { FeatureItem } from '@/types/feature';

/**
 * Données 100 % sérialisables pour un rendu compatible avec les Server Components.
 * Les icônes sont désormais des identifiants (strings) mappés côté client.
 */
export const values: ReadonlyArray<FeatureItem> = [
  {
    icon: 'HeartHandshake',
    title: 'Bienveillance',
    description: 'Un accompagnement humain, respectueux et attentif à chaque besoin.',
  },
  {
    icon: 'Users',
    title: 'Proximité',
    description: 'Être présent et à l’écoute, au plus près des familles.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Confiance',
    description: 'Des prestations fiables et encadrées, en toute transparence.',
  },
  {
    icon: 'Sparkles',
    title: 'Exigence',
    description: 'Des standards élevés pour garantir une qualité constante.',
  },
  {
    icon: 'Leaf',
    title: 'Simplicité',
    description: 'Des démarches claires et un suivi sans friction.',
  },
  {
    icon: 'Clock',
    title: 'Réactivité',
    description: 'Des réponses rapides et des interventions adaptées.',
  },
] as const;
