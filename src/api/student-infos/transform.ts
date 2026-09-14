import type {TStudentPortfolio} from '@/feature/student-portfolios/type';
import type {TCreateStudentInfoBody, TStudentInfoResponse} from './type';
import type {StudentPortfolioFormValues} from '@/feature/student-portfolios/components/edit-student-portfolio';

export function StudentInfoDtoTransform(data: TStudentInfoResponse): TStudentPortfolio {
  return {
    id: data.id,
    studentName: data.name,
    description: data.about,
    specialization: data.major,
    technologies: data.skills.map(val => {
      return val.name;
    }),
    links: data.sources.map(val => {
      return {key: val.name, value: val.url};
    }),
    // TODO: Tell BC to return CreatedAt
    createdAt: data.createdAtUtc
  };
}

export function StudentInfosDtoTransform(data: TStudentInfoResponse[]): TStudentPortfolio[] {
  return data.map(StudentInfoDtoTransform);
}

export function CreateStudentInfoDtoTransform(data: TCreateStudentInfoBody): TCreateStudentInfoBody {
  return data;
}

export function UpdateStudentInfoDtoTransform(data: StudentPortfolioFormValues): TCreateStudentInfoBody {
  return {
    name: data.studentName,
    about: data.description,
    major: data.specialization,
    skills: data.technologies.map(val => {
      return val.name;
    }),
    sources: data.links.map(val => {
      return {
        name: val.key,
        url: val.value
      };
    })
  };
}
