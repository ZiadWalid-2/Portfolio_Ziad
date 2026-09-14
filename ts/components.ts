/**
 * @file components.ts
 * TypeScript declarations for rendering and state management functions
 */

import { Experience, Skill, Project, Achievement, Testimonial, Service, Education } from './types';

export type RenderFunction<T> = (items: T[], containerElement: HTMLElement) => void;

export interface ComponentRenderers {
  renderEducation: (items: Education[]) => void;
  renderExperiences: (items: Experience[]) => void;
  renderSkills: (items: Skill[]) => void;
  renderProjects: (items: Project[]) => void;
  renderAchievements: (items: Achievement[]) => void;
  renderTestimonials: (items: Testimonial[]) => void;
  renderServices: (items: Service[]) => void;
}

export interface StateMutators {
  addExperience: (item: Experience) => void;
  addSkill: (item: Skill) => void;
  addProject: (item: Project) => void;
  addAchievement: (item: Achievement) => void;
  addTestimonial: (item: Testimonial) => void;
  addService: (item: Service) => void;
}
