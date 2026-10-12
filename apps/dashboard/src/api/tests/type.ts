import type {TTestStatus} from '@/enum/test-status.enum';

export type TTestsParams = {
  search?: string;
  page: number;
  pageSize: number;
  Status?: TTestStatus;
};
export type TTestResponse = {
  id: string;
  courseName: string;
  teacherName: string;
  date: string;
  kind: number;
  courseId: string;
  teacherId: string;
  status: TTestStatus;
};

export type TCreateTestBody = {
  courseId: string;
  teacherId: string;
  date: string;
  kind: number;
};

export type TCreateTestResponse = {
  id: string;
  name?: string;
};

export type TUpdateTestBody = TCreateTestBody;

export type TTestByIdResponse = {
  id: string;
  date: string;
  kind: number;
  teacherId: string;
  courseId: string;
  status: TTestStatus;
  teacherName: string;
  courseName: string;
};
