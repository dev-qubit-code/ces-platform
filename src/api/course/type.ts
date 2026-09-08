export type TCoursesParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export type TCourseResponse = {
  id: string;
  name: string;
  countOfTests: number;
  countOfNotes: number;
};

export type TCreateCourseBody = {
  name: string;
};

export type TCreateCourseResponse = TCourseResponse;

export type TUpdateCourseBody = {
  name: string;
};

export type TCourseByIdResponse = TCourseResponse;
