export type TCourseResponse = {
  id: string;
  name: string;
  testsCount: number;
  filesCount: number;
};

export type TCreateCourseBody = {
  name: string;
};

export type TCreateCourseResponse = TCourseResponse;

export type TCourseByIdResponse = TCourseResponse;

export type TUpdateCourseBody = {
  name: string;
};

export type TCoursesParams = {
  page: number;
  pageSize: number;
  search?: string;
};
