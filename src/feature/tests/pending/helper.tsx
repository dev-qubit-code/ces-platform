import {Badge} from '@/components/ui/badge';
import {TestTypeStatus, type TTest} from './type';
import type {ColumnDef} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {EyeIcon, Trash2} from 'lucide-react';
import type {TBreadcrumb} from '@/components/header';

export const PendingTestBreadcrumb: TBreadcrumb[] = [
  {title: 'الرئيسية', url: '/'},
  {
    title: 'الاختبارات',
    url: '/tests/all'
  },
  {title: 'المعلقة', url: '/tests/pending'}
];

export const TestColumns: ColumnDef<TTest>[] = [
  {
    accessorKey: 'name',
    header: 'اسم المادة'
  },
  {
    accessorKey: 'lecturer',
    header: 'اسم الدكتور / دكتورة'
  },
  {
    accessorKey: 'type',
    header: 'نوع الاختبار',
    cell: ({row}) => {
      const type = row.original.type;
      const {name, variant} = TestTypeStatus[type];
      return <Badge variant={variant}>{name}</Badge>;
    }
  },
  {
    accessorKey: 'publishedAt',
    header: 'سنة الاختبار'
  },
  {
    header: 'الاجاراءات',
    cell: () => {
      return (
        <div className='flex gap-2'>
          <Button variant={'outline'} size={'icon-lg'}>
            <EyeIcon />
          </Button>
          <Button variant={'destructive'} size={'icon-lg'}>
            <Trash2 />
          </Button>
        </div>
      );
    }
  }
];

export const mockTestData: TTest[] = [
  {
    name: 'Data Structures',
    lecturer: 'Dr. Ahmed Saleh',
    image: '/images/tests/data-structures.jpg',
    publishedAt: '2026-08-01',
    type: 'monthly'
  },
  {
    name: 'Operating Systems',
    lecturer: 'Dr. Mohammed Ali',
    image: '/images/tests/os.jpg',
    publishedAt: '2026-07-28',
    type: 'midterm'
  },
  {
    name: 'Database Systems',
    lecturer: 'Dr. Fatima Omar',
    image: '/images/tests/database.jpg',
    publishedAt: '2026-07-20',
    type: 'final'
  },
  {
    name: 'Computer Networks',
    lecturer: 'Dr. Khaled Hassan',
    image: '/images/tests/networks.jpg',
    publishedAt: '2026-07-15',
    type: 'monthly'
  },
  {
    name: 'Software Engineering',
    lecturer: 'Dr. Sara Ali',
    image: '/images/tests/software.jpg',
    publishedAt: '2026-07-10',
    type: 'final'
  }
];
