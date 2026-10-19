// Portfolio data type definitions

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  brand?: string; // Label shown on the cover image
  image?: string;
  imagePosition?: string; // CSS object-position for the cover image
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools & Design";
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  companyUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  highlights?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface PersonalInfo {
  name: string;
  handle: string;
  title: string;
  bio: string[];
  email: string;
  location: string;
  socials: SocialLink[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
