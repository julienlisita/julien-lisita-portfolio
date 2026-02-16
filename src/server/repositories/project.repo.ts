// src/server/repositories/project.repo.ts
import { projects } from '@/data/projects';
import type { Project } from '@/types/project';

export const projectRepo = {
  listAll: async (): Promise<ReadonlyArray<Project>> => projects,

  // si plus tard tu as une notion “published”, tu pourras filtrer ici
  listPublished: async (): Promise<ReadonlyArray<Project>> => projects,

  findById: async (id: string): Promise<Project | null> =>
    projects.find((p) => p.id === id) ?? null,
};
