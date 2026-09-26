import type {TestType, TTest} from '@/feature/tests/all/type';
import type {TTestResponse} from './type';

const TestKindMap: Record<number, TestType> = {
  0: 'monthly',
  1: 'midterm',
  2: 'final'
};

export function TestsDtoTransform(data: TTestResponse[]): TTest[] {
  return data.map(item => ({
    id: item.id,
    name: item.courseName,
    lecturer: item.teacherName,
    image: '',
    publishedAt: item.date,
    type: TestKindMap[item.kind] ?? 'monthly',
    status: 'pending'
  }));
}
