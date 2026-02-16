// src/types/project.ts

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'template' | 'other';

export type ProjectLink = {
  label: string; // ex: "Voir la démo", "GitHub"
  href: string;
  external?: boolean; // true pour GitHub/démo
};

export type Project = {
  id: string; // identifiant interne (stable)
  slug: string; // pour la route: /projects/[slug]
  title: string;

  // Grand public (pour cards + hero page projet)
  summary: string; // 1-2 phrases, orientées bénéfices/usage
  kind?: string; // ex: "Application web", "Site vitrine", "Plateforme"
  coverImageUrl?: string;
  coverImageAlt?: string;

  // Organisation / tri / filtres
  category?: ProjectCategory;
  highlight?: boolean;
  year?: string;

  // Contenu détaillé (page projet)
  context?: string; // pourquoi ce projet ?
  problem?: string; // problème à résoudre
  solution?: string; // approche / solution apportée
  outcomes?: string[]; // bénéfices / résultats (non techniques)
  features?: string[]; // fonctionnalités clés (non techniques, orientées utilisateur)

  // Liens (optionnels, souvent en bas de page projet)
  links?: ProjectLink[];

  // Tech (optionnel et plutôt bas de page)
  techStack?: string[]; // ex: ["Next.js", "TypeScript", ...]
};
