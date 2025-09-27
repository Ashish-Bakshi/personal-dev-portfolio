export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'languages';
  icon: string;
}

export interface Experience {
  company: string;
  position: string; 
  duration: string;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}