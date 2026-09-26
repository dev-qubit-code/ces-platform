export type TNotesParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export type TNoteResponse = {
  id: string;
  courseName: string;
  date: string;
  name: string;
  teacherName: string;
};

export type TCreateNoteBody = {
  name: string;
  courseId: string;
  teacherId: string;
  date: string;
};

export type TCreateNoteResponse = TNoteResponse;

export type TUpdateNoteBody = {
  name: string;
  date: string;
  courseId: string;
  teacherId: string;
};

export type TNoteByIdResponse = {
  id: string;
  date: string;
  name: string;
  teacherId: string;
  courseId: string;
};
