export type TStudentPortfolio = {
  id: string;

  studentName: string;

  specialization: string;

  description: string;

  technologies: string[];

  links: {
    key: string;
    value: string;
  }[];

  createdAt: string;
};
