// src/server/services/projects.service.ts
import { projectRepo } from '../repositories/project.repo';

export const listAllProjects = () => projectRepo.listAll();
export const listPublishedProjects = () => projectRepo.listPublished();
export const getProject = (id: string) => projectRepo.findById(id);
