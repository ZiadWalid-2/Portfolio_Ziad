/**
 * @file data.ts
 * Central typed initial data model for Ziad Walid Portfolio
 */

import { PortfolioData } from './types';

export const initialPortfolioData: PortfolioData = {
  profile: {
    fullName: "Ziad Walid",
    role: "Freelance Motion Graphic Designer",
    bio: "[INSERT EXACT ABOUT ME BIO HERE]",
    email: "Zezowalledzakria@gmail.com",
    phone: "01020112597",
    location: "Giza, Egypt",
    cvUrl: "assets/cv/ziad-walid-cv.pdf",
    socials: {
      facebook: "[INSERT EXACT FACEBOOK URL HERE]",
      linkedIn: "https://www.linkedin.com/in/zeyad-walled",
      github: "[INSERT EXACT GITHUB URL HERE]"
    }
  },
  education: [
    {
      id: "edu-1",
      university: "Cairo University",
      program: "Business English",
      degree: "Bachelor's degree (Fourth-year student)",
      grade: "Excellent",
      startYear: "[INSERT START YEAR]",
      endYear: "2027 (Expected)",
      description: "Faculty of Commerce (English Section). Active participant in collegiate initiatives including MSP, IEEE, CIB summer internship, Hayat Karima Foundation, and DEPI."
    }
  ],
  experiences: [
    {
      id: "exp-1",
      workName: "DEPI",
      role: "Motion Graphic Design",
      startYear: "[INSERT START YEAR]",
      endYear: "[INSERT END YEAR/PRESENT]",
      present: false,
      description: "Digital Egypt Pioneers Initiative (DEPI) motion design training and creative production."
    },
    {
      id: "exp-2",
      workName: "Freelancer",
      role: "Motion Graphic Design",
      startYear: "[INSERT START YEAR]",
      endYear: "Present",
      present: true,
      description: "Independent creative motion graphics and visual design for various commercial clients and projects."
    }
  ],
  skills: [
    // Soft Skills / Leadership (CV-supported)
    { id: "sk-1", name: "Communication & Teamwork", category: "Soft Skills" },
    { id: "sk-2", name: "Presentation Skills", category: "Soft Skills" },
    { id: "sk-3", name: "Leadership Skills", category: "Soft Skills" },
    { id: "sk-4", name: "Time Management", category: "Soft Skills" },
    { id: "sk-5", name: "Working under pressure", category: "Soft Skills" },

    // Office Tools (CV-supported)
    { id: "sk-6", name: "Microsoft Word", category: "Tools & Office" },
    { id: "sk-7", name: "Microsoft Excel", category: "Tools & Office" },
    { id: "sk-8", name: "Microsoft PowerPoint", category: "Tools & Office" },

    // Creative & Motion Graphics
    { id: "sk-9", name: "Motion Graphics", category: "Motion Graphics" },
    { id: "sk-10", name: "Visual Storytelling", category: "Motion Graphics" },
    { id: "sk-11", name: "Graphic Design", category: "Graphic Design" },
    { id: "sk-12", name: "Brand Identity", category: "Graphic Design" }
  ],
  projects: [
    // Initial empty state as per prompt requirements: "Creative projects are coming soon."
  ],
  achievements: [
    // Initial empty state: "No achievements added yet."
  ],
  testimonials: [
    // Initial empty state: "Testimonials will appear here."
  ],
  services: [
    { id: "srv-1", name: "AI Models", description: "Integration of modern AI-assisted visual generation and creative workflows.", icon: "🤖" },
    { id: "srv-2", name: "Canva", description: "Fast, versatile brand assets, presentations, and social media layouts.", icon: "🎨" },
    { id: "srv-3", name: "Photoshop", description: "Advanced image manipulation, compositing, retouching, and visual art.", icon: "🖌️" },
    { id: "srv-4", name: "Illustrator", description: "Precision vector illustrations, iconography, and scalable creative graphics.", icon: "✒️" },
    { id: "srv-5", name: "Logo Design", description: "Distinctive, memorable brand marks and comprehensive identity systems.", icon: "⭐" },
    { id: "srv-6", name: "Film Poster", description: "Cinematic promotional posters, key visual compositions, and typography.", icon: "🎬" },
    { id: "srv-7", name: "Social Media Posts", description: "High-engagement social motion graphics and promotional media.", icon: "📱" },
    { id: "srv-8", name: "InDesign", description: "Editorial layouts, multi-page brochures, print collateral, and catalogs.", icon: "📑" }
  ]
};
