/**
 * @file app.js
 * Central Application Controller, Data State, and Initialization
 */

import { storage } from './storage.js';
import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import {
  renderEducation,
  renderExperiences,
  renderSkills,
  renderProjects,
  renderAchievements,
  renderTestimonials,
  renderServices
} from './components.js';
import { initForms } from './forms.js';

/* ==========================================================================
   INITIAL PORTFOLIO DATA
   Configured with exact prompt fields, CV support, and editable placeholders
   ========================================================================== */

const defaultPortfolioData = {
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
      description: "Faculty of Commerce (English Section). Active collegiate experience across student activities and developmental initiatives including MSP, IEEE, CIB summer internship, Hayat Karima Foundation, and DEPI."
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
      description: "Independent creative motion graphics, visual identities, and social media animations for clients."
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
  projects: [], // Initially empty: "Creative projects are coming soon."
  achievements: [], // Initially empty: "No achievements added yet."
  testimonials: [], // Initially empty: "Testimonials will appear here."
  services: [
    { id: "srv-1", name: "AI Models", description: "Modern AI-assisted visual generation and creative motion workflows.", icon: "🤖" },
    { id: "srv-2", name: "Canva", description: "Fast, versatile brand assets, presentations, and social media graphics.", icon: "🎨" },
    { id: "srv-3", name: "Photoshop", description: "Advanced image manipulation, compositing, retouching, and visual art.", icon: "🖌️" },
    { id: "srv-4", name: "Illustrator", description: "Precision vector illustrations, iconography, and scalable creative graphics.", icon: "✒️" },
    { id: "srv-5", name: "Logo Design", description: "Distinctive, memorable brand marks and comprehensive identity systems.", icon: "⭐" },
    { id: "srv-6", name: "Film Poster", description: "Cinematic promotional posters, key visual compositions, and typography.", icon: "🎬" },
    { id: "srv-7", name: "Social Media Posts", description: "High-engagement social motion graphics and promotional media.", icon: "📱" },
    { id: "srv-8", name: "InDesign", description: "Editorial layouts, multi-page brochures, print collateral, and catalogs.", icon: "📑" }
  ]
};

/* ==========================================================================
   STATE MANAGEMENT & LOCAL STORAGE SYNC
   ========================================================================== */

const STORAGE_KEYS = {
  EXPERIENCES: 'ziad_portfolio_experiences',
  SKILLS: 'ziad_portfolio_skills',
  PROJECTS: 'ziad_portfolio_projects',
  ACHIEVEMENTS: 'ziad_portfolio_achievements',
  TESTIMONIALS: 'ziad_portfolio_testimonials',
  SERVICES: 'ziad_portfolio_services'
};

class PortfolioApp {
  constructor() {
    this.data = {
      profile: defaultPortfolioData.profile,
      education: defaultPortfolioData.education,
      experiences: storage.get(STORAGE_KEYS.EXPERIENCES, defaultPortfolioData.experiences),
      skills: storage.get(STORAGE_KEYS.SKILLS, defaultPortfolioData.skills),
      projects: storage.get(STORAGE_KEYS.PROJECTS, defaultPortfolioData.projects),
      achievements: storage.get(STORAGE_KEYS.ACHIEVEMENTS, defaultPortfolioData.achievements),
      testimonials: storage.get(STORAGE_KEYS.TESTIMONIALS, defaultPortfolioData.testimonials),
      services: storage.get(STORAGE_KEYS.SERVICES, defaultPortfolioData.services)
    };
  }

  init() {
    // 1. Theme Controller
    initTheme();

    // 2. Navigation & Scrolling
    initNavigation();

    // 3. Render All Dynamic Sections
    this.renderAll();

    // 4. Form Handlers & Modal Logic
    initForms({
      onAddExperience: (item) => this.addExperience(item),
      onAddSkill: (item) => this.addSkill(item),
      onAddProject: (item) => this.addProject(item),
      onAddAchievement: (item) => this.addAchievement(item),
      onAddTestimonial: (item) => this.addTestimonial(item),
      onAddService: (item) => this.addService(item)
    });

    // 5. Year in Footer
    const currentYearEl = document.querySelector('#current-year');
    if (currentYearEl) {
      currentYearEl.textContent = String(new Date().getFullYear());
    }
  }

  renderAll() {
    // Education
    const eduList = document.querySelector('#education-list');
    renderEducation(this.data.education, eduList);

    // Experience
    const expList = document.querySelector('#experience-list');
    renderExperiences(this.data.experiences, expList);

    // Skills
    const skillsGrid = document.querySelector('#skills-grid');
    renderSkills(this.data.skills, skillsGrid);

    // Projects
    const projectsGrid = document.querySelector('#projects-grid');
    const projectsEmpty = document.querySelector('#projects-empty');
    renderProjects(this.data.projects, projectsGrid, projectsEmpty);

    // Achievements
    const achievementsGrid = document.querySelector('#achievements-grid');
    const achievementsEmpty = document.querySelector('#achievements-empty');
    renderAchievements(this.data.achievements, achievementsGrid, achievementsEmpty);

    // Testimonials
    const testimonialsGrid = document.querySelector('#testimonials-grid');
    const testimonialsEmpty = document.querySelector('#testimonials-empty');
    renderTestimonials(this.data.testimonials, testimonialsGrid, testimonialsEmpty);

    // Services
    const servicesGrid = document.querySelector('#services-grid');
    renderServices(this.data.services, servicesGrid);
  }

  addExperience(item) {
    this.data.experiences.unshift(item);
    storage.set(STORAGE_KEYS.EXPERIENCES, this.data.experiences);
    renderExperiences(this.data.experiences, document.querySelector('#experience-list'));
  }

  addSkill(item) {
    this.data.skills.push(item);
    storage.set(STORAGE_KEYS.SKILLS, this.data.skills);
    renderSkills(this.data.skills, document.querySelector('#skills-grid'));
  }

  addProject(item) {
    this.data.projects.unshift(item);
    storage.set(STORAGE_KEYS.PROJECTS, this.data.projects);
    renderProjects(
      this.data.projects,
      document.querySelector('#projects-grid'),
      document.querySelector('#projects-empty')
    );
  }

  addAchievement(item) {
    this.data.achievements.unshift(item);
    storage.set(STORAGE_KEYS.ACHIEVEMENTS, this.data.achievements);
    renderAchievements(
      this.data.achievements,
      document.querySelector('#achievements-grid'),
      document.querySelector('#achievements-empty')
    );
  }

  addTestimonial(item) {
    this.data.testimonials.unshift(item);
    storage.set(STORAGE_KEYS.TESTIMONIALS, this.data.testimonials);
    renderTestimonials(
      this.data.testimonials,
      document.querySelector('#testimonials-grid'),
      document.querySelector('#testimonials-empty')
    );
  }

  addService(item) {
    this.data.services.push(item);
    storage.set(STORAGE_KEYS.SERVICES, this.data.services);
    renderServices(this.data.services, document.querySelector('#services-grid'));
  }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});
