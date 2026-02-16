// src/components/portfolio/ProjectsSectionServer.tsx

import { getPublicProjectsServer } from '@/server/services/projects.server';
import ProjectsSection from './ProjectsSection';

export default async function ProjectsSectionServer() {
  const onlyFeatured = false;

  const all = await getPublicProjectsServer();
  let filtered = onlyFeatured ? all.filter((p) => p.highlight) : all;
  if (filtered.length === 0) filtered = all;

  return <ProjectsSection items={filtered} />;
}
