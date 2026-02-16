// src/data/projects.ts

import type { Project } from '@/types/project';

export const projects: ReadonlyArray<Project> = [
  {
    id: 'project-one',
    slug: 'project-one',
    title: 'Projet Exemple',
    kind: 'Projet digital',
    summary:
      'Un projet illustrant la conception et la réalisation d’une solution digitale claire, efficace et adaptée aux besoins.',
    coverImageUrl: '/images/projects/project-1.jpg',
    coverImageAlt: 'Aperçu du projet exemple',
    category: 'fullstack',
    highlight: true,
    year: '2025',

    context:
      'Ce projet a été réalisé pour répondre à un besoin précis, avec l’objectif de proposer une solution simple et durable.',
    problem:
      'Les utilisateurs avaient besoin d’un outil fiable, facile à utiliser et accessible sur différents supports.',
    solution:
      'Une application pensée autour de l’expérience utilisateur, avec une architecture claire et évolutive.',
    features: [
      'Interface claire et intuitive',
      'Fonctionnalités essentielles bien identifiées',
      'Adapté aux usages desktop et mobile',
    ],
    outcomes: ['Meilleure lisibilité de l’information', 'Utilisation plus fluide au quotidien'],
    links: [
      { label: 'Découvrir le projet', href: '/portfolio/project-one', external: false },
      { label: 'Voir une démo', href: '#', external: true },
    ],
    techStack: ['React', 'Node.js', 'Base de données'],
  },

  {
    id: 'project-two',
    slug: 'project-two',
    title: 'Application de gestion',
    kind: 'Application web',
    summary:
      'Une application conçue pour organiser, centraliser et simplifier la gestion d’informations.',
    coverImageUrl: '/images/projects/project-2.jpg',
    coverImageAlt: 'Aperçu application de gestion',
    category: 'fullstack',
    year: '2025',

    context:
      'Le projet est né d’un besoin de structuration et de gain de temps dans des tâches répétitives.',
    problem: 'Les informations étaient dispersées et difficiles à suivre au quotidien.',
    solution:
      'Une application centralisée, avec une navigation simple et des fonctionnalités ciblées.',
    features: [
      'Organisation claire des données',
      'Navigation rapide',
      'Fonctionnalités pensées pour l’usage quotidien',
    ],
    outcomes: ['Gain de temps significatif', 'Réduction des erreurs liées à la saisie manuelle'],
    links: [{ label: 'Découvrir le projet', href: '/portfolio/project-two', external: false }],
    techStack: ['React', 'Node.js'],
  },

  {
    id: 'project-three',
    slug: 'project-three',
    title: 'Site vitrine professionnel',
    kind: 'Site vitrine',
    summary:
      'Un site vitrine moderne permettant de présenter une activité, ses services et ses informations clés.',
    coverImageUrl: '/images/projects/project-3.jpg',
    coverImageAlt: 'Aperçu site vitrine',
    category: 'frontend',
    highlight: true,
    year: '2024',

    context: 'L’objectif était de disposer d’un site clair, rapide et facile à maintenir.',
    problem:
      'Les supports existants manquaient de cohérence et n’étaient pas adaptés aux usages actuels.',
    solution: 'Un site structuré autour de pages types, avec un design cohérent et responsive.',
    features: [
      'Pages essentielles (Accueil, Services, Contact)',
      'Design responsive',
      'Structure claire et maintenable',
    ],
    outcomes: ['Image professionnelle renforcée', 'Mise à jour des contenus facilitée'],
    links: [{ label: 'Découvrir le projet', href: '/portfolio/project-three', external: false }],
    techStack: ['Next.js', 'TypeScript', 'CSS'],
  },

  {
    id: 'project-template',
    slug: 'project-template',
    title: 'Template technique',
    kind: 'Template',
    summary: 'Un socle technique réutilisable pour démarrer rapidement de nouveaux projets.',
    coverImageUrl: '/images/projects/project-template.jpg',
    coverImageAlt: 'Illustration template technique',
    category: 'template',
    year: '2025',

    context:
      'Ce template a été conçu pour éviter les tâches répétitives au démarrage de nouveaux projets.',
    problem: 'Les phases de mise en place sont souvent longues et sources d’incohérences.',
    solution: 'Une base technique claire, structurée et prête à évoluer.',
    features: ['Architecture claire', 'Bonnes pratiques intégrées', 'Facilement extensible'],
    outcomes: ['Démarrage de projet plus rapide', 'Base technique fiable'],
    links: [{ label: 'Découvrir le projet', href: '/portfolio/project-template', external: false }],
    techStack: ['TypeScript', 'Node.js', 'Base de données'],
  },
] as const;
