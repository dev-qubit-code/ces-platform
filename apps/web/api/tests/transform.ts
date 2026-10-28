import type {TTestResponse} from './type';
import {TTest, TestType} from '@/app/tests/_components/test-item';

const TestKindMap: Record<number, TestType> = {
  0: 'monthly',
  1: 'midterm',
  2: 'final'
} as const;

export function TestsDtoTransform(data: TTestResponse[]): TTest[] {
  return data.map(item => ({
    id: item.id,
    course: item.courseName,
    lecturer: item.teacherName,
    // TODO: Add It From BC
    image: '',
    date: item.date,
    type: TestKindMap[item.kind] ?? 'monthly'
  }));
}
