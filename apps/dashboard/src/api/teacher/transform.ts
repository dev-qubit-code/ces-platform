import type {TLecturers} from '@/feature/lecturers/type';
import type {TTeacherResponse} from './type';

export function TeachersDtoTransform(data: TTeacherResponse[]): TLecturers[] {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    testsCount: item.testsCount,
    filesCount: item.notesCount
  }));
}
