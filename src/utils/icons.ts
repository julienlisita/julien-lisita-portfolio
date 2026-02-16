// src/utils/icons.ts
import {
  HeartHandshake,
  Users,
  ShieldCheck,
  Sparkles,
  Leaf,
  Clock,
  Home,
  FileText,
  Moon,
  Handshake,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

/**
 * Dictionnaire global des icônes disponibles dans le site.
 * Utilisé pour mapper les identifiants string (ex: "HeartHandshake") vers les composants React Lucide.
 */
export const ICONS = {
  // Valeurs / valeurs humaines
  HeartHandshake,
  Users,
  ShieldCheck,
  Sparkles,
  Leaf,
  Clock,

  // Services
  Home,
  FileText,
  Moon,
  Handshake,

  // Contact
  Phone,
  Mail,
  MapPin,
} as const;

/**
 * Type utilitaire représentant les clés disponibles du dictionnaire d'icônes.
 * Exemple : "HeartHandshake" | "Users" | "Mail" | ...
 */
export type IconKey = keyof typeof ICONS;
