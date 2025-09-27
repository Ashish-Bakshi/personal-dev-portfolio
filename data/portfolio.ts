import { Project, Skill, Experience } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: '1',
    title: 'File Storage and Sharing Platform',
    description: 'Full-stack cloud storage solution.',
    image: '/cloudnest.png',
    tech: ['Next.js', 'Appwrite'],
    githubUrl: 'https://github.com/Ashish-Bakshi/CloudNest',
    liveUrl: 'https://cloud-nest-ten-nu.vercel.app/',
    featured: false
  },
  {
    id: '2',
    title: 'CRM Application',
    description: 'Custom CRM built for client to enhance business workflows and track customer interactions.',
    image: '/crm.png',
    tech: ['React', 'MongoDB', 'REST API', 'TypeScript'],
    githubUrl: 'https://github.com/Ashish-Bakshi/project0/',
    liveUrl: 'https://crm-sgk-fe.onrender.com/#/login',
    featured: false
  }
];

export const skills: Skill[] = [
  { name: 'HTML', category: 'frontend', icon: 'Braces' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'Layers' },
  { name: 'Javascript', category: 'frontend', icon: 'CodeSquare' },
  { name: 'React', category: 'frontend', icon: 'Code2' },
  { name: 'TypeScript', category: 'frontend', icon: 'FileCode' },
  { name: 'Next.js', category: 'frontend', icon: 'Zap' },
  { name: 'Node.js', category: 'backend', icon: 'Server' },
  { name: 'Express.js', category: 'backend', icon: 'Route' },
  { name: 'FastAPI', category: 'backend', icon: 'Rocket' },
  { name: 'MongoDB', category: 'backend', icon: 'Leaf' },
  { name: 'PostgreSQL', category: 'backend', icon: 'Database' },
  { name: 'Prisma', category: 'backend', icon: 'DatabaseZap' },
  { name: 'Redis', category: 'backend', icon: 'Activity' },
  { name: 'MySQL', category: 'backend', icon: 'Database' },
  { name: 'Git', category: 'tools', icon: 'GitBranch' },
  { name: 'GitHub', category: 'tools', icon: 'Github' },
  { name: 'Docker', category: 'tools', icon: 'Container' },
  { name: 'Figma', category: 'tools', icon: 'Palette' },
  { name: 'Postman', category: 'tools', icon: 'Send' },
  { name: 'Java', category: 'languages', icon: 'Coffee' },
  { name: 'C++', category: 'languages', icon: 'Binary' },
  { name: 'Python', category: 'languages', icon: 'BrainCircuit' }
  
];

export const experience: Experience[] = [
  {
    company: 'SGK Business Support Pvt. Ltd.',
    position: 'Full-Stack Developer (Freelancer)',
    duration: 'May 2025 - June 2025',
    description: 'Developed and deployed a full-stack CRM using the MERN stack with JWT-secured role-based access, improving lead management, sales workflows, and team collaboration (99.9% uptime on Render).'
  },
];