import type {TNoteResponse} from './type';
import {TMemories} from '@/app/memoirs/_components/file-card';

export function NotesDtoTransform(data: TNoteResponse[]): TMemories[] {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    courseName: item.courseName,
    lectureName: item.teacherName,
    link: 'item.link',
  }));
}
