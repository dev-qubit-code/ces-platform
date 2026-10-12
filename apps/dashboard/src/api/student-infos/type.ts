import type { StudentPortfolioFormValues } from '@/feature/student-portfolios/components/edit-student-portfolio';
import type {TPaginationResponse} from '../type';

export type TStudentInfosParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export type TUpdateStudentInfoParams = {
  id: string;
  data: StudentPortfolioFormValues;
};

export type TStudentInfoSkillResponse = {
  id: string;
  name: string;
};

export type TStudentInfoSourceResponse = {
  id: string;
  name: string;
  url: string;
};

export type TStudentInfoResponse = {
  id: string;
  name: string;
  about: string;
  major: string;
  skills: TStudentInfoSkillResponse[];
  sources: TStudentInfoSourceResponse[];
  createdAtUtc: string;
};

export type TCreateStudentInfoBody = {
  name: string;
  about: string;
  major: string;
  skills: string[];
  sources: {
    name: string;
    url: string;
  }[];
};

export type TUpdateStudentInfoBody = TCreateStudentInfoBody;

export type TStudentInfosResponse = TPaginationResponse<TStudentInfoResponse>;
