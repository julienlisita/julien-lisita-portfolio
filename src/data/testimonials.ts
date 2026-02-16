// src/data/testimonials.ts

import type { Testimonial } from '@/types/testimonial';

export const testimonials: ReadonlyArray<Testimonial> = [
  {
    id: 1,
    name: 'Jean Dupont',
    role: 'Client',
    company: 'Entreprise Exemple',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    rating: 5,
    avatarUrl: '/images/testimonials/avatar.jpg',
    displayDate: 'Août 2025',
    highlight: true,
    city: 'Bordeaux',
  },
  {
    id: 2,
    name: 'Marie Martin',
    role: 'Cliente',
    company: 'Organisation Démo',
    quote:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
    rating: 4.5,
    avatarUrl: '/images/testimonials/avatar.jpg',
    displayDate: 'Juillet 2025',
    city: 'Lyon',
  },
  {
    id: 3,
    name: 'Paul Leroy',
    role: 'Utilisateur',
    company: 'Projet Test',
    quote:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.',
    rating: 5,
    avatarUrl: '/images/testimonials/avatar.jpg',
    displayDate: 'Juin 2025',
    city: 'Paris',
  },
  {
    id: 4,
    name: 'Sophie Bernard',
    role: 'Responsable',
    company: 'Startup Exemple',
    quote:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
    rating: 4,
    avatarUrl: '/images/testimonials/avatar.jpg',
    displayDate: 'Mai 2025',
    city: 'Marseille',
  },
  {
    id: 5,
    name: 'Antoine Dubois',
    role: 'Coach',
    company: 'Formation Démo',
    quote:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    rating: 5,
    avatarUrl: '/images/testimonials/avatar.jpg',
    displayDate: 'Mars 2025',
    city: 'Lille',
  },
  {
    id: 6,
    name: 'Claire Petit',
    role: 'Entrepreneuse',
    company: 'Consulting Générique',
    quote:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    rating: 4.5,
    avatarUrl: '/images/testimonials/avatar.jpg',
    displayDate: 'Février 2025',
    highlight: false,
    city: 'Strasbourg',
  },
] as const;
