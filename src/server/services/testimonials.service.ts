// src/server/services/testimonials.service.ts

import { testimonialRepo } from '../repositories/testimonial.repo';

export const listAllTestimonials = () => testimonialRepo.listAll();
export const listPublishedTestimonials = () => testimonialRepo.listPublished();
export const getTestimonial = (id: number) => testimonialRepo.findById(id);

export const publishTestimonial = (id: number) => testimonialRepo.publish(id);
export const unpublishTestimonial = (id: number) => testimonialRepo.unpublish(id);
export const setTestimonialHighlight = (id: number, value: boolean) =>
  testimonialRepo.setHighlight(id, value);

export const updateTestimonial = (id: number, data: Parameters<typeof testimonialRepo.update>[1]) =>
  testimonialRepo.update(id, data);

export const deleteTestimonial = (id: number) => testimonialRepo.remove(id);

// Optionnel : si tu as un formulaire public
export const createTestimonialFromPublic = (
  input: Parameters<typeof testimonialRepo.createFromPublic>[0]
) => testimonialRepo.createFromPublic(input);
