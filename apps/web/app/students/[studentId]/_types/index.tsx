export interface StudentLink {
  key: string;
  name: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  major: string;
  bio: string;
  technologies: string[];
  links: StudentLink[];
}
