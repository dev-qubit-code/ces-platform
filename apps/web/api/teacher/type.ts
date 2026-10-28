export type TTeachersParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export type TTeacherResponse = {
  id: string;
  name: string;
  testsCount: number;
  notesCount: number;
};

export type TCreateTeacherBody = {
  name: string;
};

export type TCreateTeacherResponse = TTeacherResponse;

export type TUpdateTeacherBody = {
  name: string;
};

export type TTeacherByIdResponse = TTeacherResponse;
