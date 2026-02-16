// src/data/jobOffers.ts

import type { JobOffer } from '@/types/job';

export const jobOffers: ReadonlyArray<JobOffer> = [
  {
    id: 1,
    slug: 'assistant-administratif-polyvalent',
    title: 'Assistant·e administratif·ve polyvalent·e',
    location: 'Gironde',
    contractType: 'CDI – Temps partiel',
    publishedAt: '2025-09-15T09:00:00Z',
    description:
      'Participer à la gestion administrative quotidienne de la structure : accueil, suivi des dossiers, coordination interne et soutien aux équipes.',
    service: 'Administration / Support',
    reportingLine: 'Responsable administratif·ve',
    missionStatement:
      'Assurer un soutien administratif fiable et structuré afin de faciliter l’organisation interne et la qualité de service.',
    sections: [
      {
        key: 'missions',
        title: 'Missions principales',
        groups: [
          {
            title: '1) Gestion administrative',
            items: [
              'Accueil téléphonique et gestion des emails.',
              'Classement et suivi des dossiers administratifs.',
              'Rédaction de documents et comptes rendus.',
              'Mise à jour des outils de suivi internes.',
            ],
          },
          {
            title: '2) Coordination interne',
            items: [
              'Transmission des informations aux équipes.',
              'Suivi des demandes et priorisation.',
              'Interface entre les différents services.',
            ],
          },
        ],
      },
      {
        key: 'skills',
        title: 'Compétences requises',
        items: [
          'Maîtrise des outils bureautiques.',
          'Bonne communication écrite et orale.',
          'Organisation et rigueur.',
        ],
      },
      {
        key: 'profile',
        title: 'Profil recherché',
        items: [
          'Première expérience en assistanat ou secrétariat.',
          'Autonomie et sens des responsabilités.',
        ],
      },
    ],
    scheduleNote: 'Horaires de bureau, du lundi au vendredi.',
    workMode: 'Présentiel.',
    remunerationNote: 'Rémunération selon profil et expérience.',
    equipments: ['Poste informatique', 'Téléphone professionnel'],
  },

  {
    id: 2,
    slug: 'aide-a-domicile',
    title: 'Aide à domicile',
    location: 'Charente',
    contractType: 'CDD – Temps plein',
    publishedAt: '2025-09-20T09:00:00Z',
    description:
      'Intervenir au domicile des bénéficiaires pour les accompagner dans les actes de la vie quotidienne et contribuer à leur bien-être.',
    service: 'Intervention à domicile',
    reportingLine: 'Coordinateur·rice de secteur',
    missionStatement:
      'Apporter un accompagnement humain et professionnel afin de favoriser l’autonomie et le confort des personnes accompagnées.',
    sections: [
      {
        key: 'missions',
        title: 'Missions principales',
        groups: [
          {
            title: '1) Accompagnement quotidien',
            items: [
              'Aide aux gestes de la vie courante.',
              'Aide aux courses et à la préparation des repas.',
              'Entretien du cadre de vie.',
            ],
          },
          {
            title: '2) Relationnel et suivi',
            items: [
              'Écoute et présence bienveillante.',
              'Remontée d’informations à la coordination.',
            ],
          },
        ],
      },
      {
        key: 'skills',
        title: 'Compétences requises',
        items: ['Sens du service et empathie.', 'Capacité d’adaptation.'],
      },
      {
        key: 'profile',
        title: 'Profil recherché',
        items: ['Expérience appréciée mais débutant·e accepté·e.', 'Fiabilité et ponctualité.'],
      },
    ],
    scheduleNote: 'Planning variable selon interventions.',
    workMode: 'Interventions au domicile des bénéficiaires.',
    remunerationNote: 'Selon convention collective applicable.',
    equipments: ['Tenue professionnelle', 'Téléphone professionnel'],
  },

  {
    id: 3,
    slug: 'coordinateur-de-secteur',
    title: 'Coordinateur·rice de secteur',
    location: 'Gironde & Charente',
    contractType: 'CDI – Temps plein',
    publishedAt: '2025-10-01T09:00:00Z',
    description:
      'Coordonner les équipes d’intervention et assurer le suivi des prestations auprès des bénéficiaires.',
    service: 'Coordination / Management',
    reportingLine: 'Responsable d’agence',
    missionStatement:
      'Garantir une organisation efficace des interventions et un haut niveau de qualité de service.',
    sections: [
      {
        key: 'missions',
        title: 'Missions principales',
        groups: [
          {
            title: '1) Organisation des interventions',
            items: [
              'Planification des interventions.',
              'Gestion des remplacements et imprévus.',
              'Suivi des heures et des prestations.',
            ],
          },
          {
            title: '2) Management et suivi qualité',
            items: [
              'Accompagnement des équipes.',
              'Relation avec les bénéficiaires.',
              'Traitement des situations complexes.',
            ],
          },
        ],
      },
      {
        key: 'skills',
        title: 'Compétences requises',
        items: ['Capacité d’organisation.', 'Leadership et communication.'],
      },
      {
        key: 'profile',
        title: 'Profil recherché',
        items: ['Expérience en coordination ou management.', 'Connaissance du secteur appréciée.'],
      },
    ],
    scheduleNote: 'Horaires de journée, astreintes ponctuelles possibles.',
    workMode: 'Présentiel et déplacements terrain.',
    remunerationNote: 'Selon profil et responsabilités.',
    equipments: ['Ordinateur portable', 'Téléphone professionnel'],
  },

  {
    id: 4,
    slug: 'agent-polyvalent-de-service',
    title: 'Agent·e polyvalent·e de service',
    location: 'Gironde',
    contractType: 'CDI – Temps partiel',
    publishedAt: '2025-10-10T09:00:00Z',
    description:
      'Assurer diverses missions de soutien logistique et de service auprès des bénéficiaires et des équipes.',
    service: 'Services généraux',
    reportingLine: 'Responsable de site',
    missionStatement:
      'Contribuer au bon fonctionnement quotidien de la structure par des actions polyvalentes et utiles.',
    sections: [
      {
        key: 'missions',
        title: 'Missions principales',
        groups: [
          {
            title: '1) Services généraux',
            items: ['Petits travaux d’entretien.', 'Aide logistique ponctuelle.'],
          },
          {
            title: '2) Soutien aux équipes',
            items: ['Appui aux besoins opérationnels.', 'Respect des consignes et procédures.'],
          },
        ],
      },
      {
        key: 'skills',
        title: 'Compétences requises',
        items: ['Polyvalence.', 'Autonomie.'],
      },
      {
        key: 'profile',
        title: 'Profil recherché',
        items: ['Goût pour le travail de terrain.', 'Sens pratique.'],
      },
    ],
    scheduleNote: 'Horaires variables selon besoins.',
    workMode: 'Présentiel.',
    remunerationNote: 'Rémunération selon profil.',
    equipments: ['Équipements de protection', 'Matériel adapté'],
  },
] as const;
