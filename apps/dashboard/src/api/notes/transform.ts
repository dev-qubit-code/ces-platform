import type {TMemoir} from '@/feature/memoirs/type';
import type {TNoteResponse} from './type';

export function NotesDtoTransform(data: TNoteResponse[]): TMemoir[] {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    lecturer: item.teacherName,
    course: item.courseName,
    date: item.date
  }));
}
