// src/types/job.ts

export type JobOffer = {
  id: number | string;
  slug: string; // pour la page détail
  title: string;
  location: string;
  contractType: string;
  publishedAt: string; // ISO string
  description: string; // teaser court pour la carte
  // --- nouveau : contenu riche ---
  service?: string;
  reportingLine?: string; // rattachement hiérarchique
  missionStatement?: string; // objectif principal du poste
  sections?: Array<{
    key: string; // "missions", "skills", etc.
    title: string;
    items?: string[]; // listes à puces
    groups?: Array<{
      // sous-sections avec items
      title: string;
      items: string[];
    }>;
  }>;
  scheduleNote?: string; // ex: soirs, WE, JF selon planning
  workMode?: string; // téléphonique / sur site
  remunerationNote?: string; // indemnités / convention
  equipments: string[]; // matériel fourni
};
