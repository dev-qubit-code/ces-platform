import type {TStudentPortfolio} from '@/feature/student-portfolios/type';
import type {TCreateStudentInfoBody, TStudentInfoResponse} from './type';

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
    createdAt: new Date().toISOString()
  };
}

export function StudentInfosDtoTransform(data: TStudentInfoResponse[]): TStudentPortfolio[] {
  return data.map(StudentInfoDtoTransform);
}

export function CreateStudentInfoDtoTransform(data: TCreateStudentInfoBody): TCreateStudentInfoBody {
  return data;
}

export function UpdateStudentInfoDtoTransform(data: TCreateStudentInfoBody): TCreateStudentInfoBody {
  return data;
}
