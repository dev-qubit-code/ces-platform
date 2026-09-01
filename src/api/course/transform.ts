import type {TCourse} from '@/feature/courses/type';
import type {TCourseResponse} from './type';

export function CoursesDtoTransform(data: TCourseResponse[]): TCourse[] {
  return data.map(course => ({
    id: course.id,
    name: course.name,
    testsCount: course.testsCount,
    filesCount: course.filesCount
  }));
}
