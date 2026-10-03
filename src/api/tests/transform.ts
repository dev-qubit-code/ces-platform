import type {TestType, TTest} from '@/feature/tests/all/type';
import type {TTestResponse} from './type';
import {TEST_STATUS_MAPPER} from '@/enum/test-status.enum';

const TestKindMap: Record<number, TestType> = {
  0: 'monthly',
  1: 'midterm',
  2: 'final'
};

export function TestsDtoTransform(data: TTestResponse[]): TTest[] {
  return data.map(item => ({
    id: item.id,
    name: item.testName,
    lecturer: item.teacherName,
    course: item.courseName,
    // TODO: Add It From BC
    image: '',
    publishedAt: item.date,
    type: TestKindMap[item.kind] ?? 'monthly',
    status: TEST_STATUS_MAPPER[item.status]
  }));
}
