// src/server/services/projects.server.ts

import { listPublishedProjects } from './projects.service';

export async function getPublicProjectsServer() {
  return listPublishedProjects();
}

export async function getPublicProjectBySlugServer(slug: string) {
  const items = await listPublishedProjects();
  return items.find((p) => p.slug === slug) ?? null;
}
