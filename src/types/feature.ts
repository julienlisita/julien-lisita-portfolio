// src/types/feature.ts

import type React from 'react';
import type { IconKey } from '@/utils/icons';

/** Représente une feature affichable via FeatureCard */
export type FeatureItem = {
  icon:
    | IconKey
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string | React.ReactNode;
  href?: string;
};
