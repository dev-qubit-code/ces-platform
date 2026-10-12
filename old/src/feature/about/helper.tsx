import type {TBreadcrumb} from '@/components/header';

export const AboutBreadcrumb: TBreadcrumb[] = [
  {title: 'الرئيسية', url: '/'},
  {title: 'عن المطورين', url: '/about'}
];

type TDevelopers = {
  id: number;
  name: string;
  role: string;
  status: string;
  bio: string;
  stats: {
    experience: string;
    projects: string;
  };
  stack: {
    frontend?: string[];
    backend?: string[];
    tools?: string[];
  };
  initials: string;
  socials: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    email?: string;
  };
};

export const developers: TDevelopers[] = [
  {
    id: 1,
    name: 'عبدالرحمن منير الجعيدي',
    role: 'مهندس حاسوب',
    status: 'يعمل على تطوير النظام 🚀',
    bio: 'مهندس حاسوب ومطور ويب متكامل، متخصص في تقنيات MERN Stack وإطار عمل Next.js لبناء تطبيقات ويب حديثة وعالية الأداء.',
    stats: {experience: '+4 سنوات', projects: '+20 مشروع'},
    stack: {
      frontend: ['Next.js', 'React', 'Tailwind', 'Zustand'],
      backend: ['Node.js', 'Express', 'MongoDB', 'Prisma'],
      tools: ['Git', 'Figma', 'VS Code']
    },
    initials: 'عم',
    socials: {github: '#', linkedin: '#', portfolio: '#', email: '#'}
  },
  {
    id: 2,
    name: 'عبدالله يسلم النهدي',
    role: 'مهندس حاسوب',
    status: 'يشارك في تطوير الأنظمة ✨',
    bio: 'مهندس حاسوب متخصص في تطوير الأنظمة والخوادم باستخدام تقنيات .NET وبناء حلول برمجية قوية وموثوقة.',
    stats: {experience: '+3 سنوات', projects: '+15 مشروع'},
    stack: {
      frontend: ['HTML/CSS', 'JavaScript'],
      backend: ['.NET', 'C#', 'SQL Server', 'Entity Framework'],
      tools: ['Git', 'Visual Studio', 'Postman']
    },
    initials: 'عي',
    socials: {github: '#', linkedin: '#', portfolio: '#', email: '#'}
  }
];
