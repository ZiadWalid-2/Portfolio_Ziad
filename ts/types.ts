/**
 * @file types.ts
 * TypeScript Architecture & Interfaces for Ziad Walid Portfolio
 */

export interface Experience {
  id: string;
  workName: string;
  role: string;
  startYear: number | string;
  endYear?: number | string;
  present?: boolean;
  description?: string;
}

export interface Education {
  id: string;
  university: string;
  program: string;
  degree: string;
  grade: string;
  startYear: number | string;
  endYear?: number | string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Graphic Design' | 'Motion Graphics' | 'Tools & Office' | 'Soft Skills' | string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  image?: string;
  url?: string;
  description?: string;
  category?: string;
}

export interface Achievement {
  id: string;
  title: string;
  image?: string;
  description?: string;
  source?: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  feedback: string;
  rating: number; // 1 to 5
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
}

export interface Profile {
  fullName: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  cvUrl: string;
  socials: {
    facebook: string;
    linkedIn: string;
    github: string;
  };
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  services: Service[];
}
