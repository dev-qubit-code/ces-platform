import {Badge} from '@/components/ui/badge';
import {TestStatus, TestTypeStatus, type TTest} from './type';
import type {ColumnDef} from '@tanstack/react-table';
import {Button} from '@/components/ui/button';
import {EyeIcon, Trash2} from 'lucide-react';

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
    accessorKey: 'status',
    header: 'جالة الاختبار',
    cell: ({row}) => {
      const status = row.original.status;
      const {name, variant} = TestStatus[status];
      return <Badge variant={variant}>{name}</Badge>;
    }
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
    type: 'monthly',
    status: 'approved'
  },
  {
    name: 'Operating Systems',
    lecturer: 'Dr. Mohammed Ali',
    image: '/images/tests/os.jpg',
    publishedAt: '2026-07-28',
    type: 'midterm',
    status: 'pending'
  },
  {
    name: 'Database Systems',
    lecturer: 'Dr. Fatima Omar',
    image: '/images/tests/database.jpg',
    publishedAt: '2026-07-20',
    type: 'final',
    status: 'pending'
  },
  {
    name: 'Computer Networks',
    lecturer: 'Dr. Khaled Hassan',
    image: '/images/tests/networks.jpg',
    publishedAt: '2026-07-15',
    type: 'monthly',
    status: 'rejected'
  },
  {
    name: 'Software Engineering',
    lecturer: 'Dr. Sara Ali',
    image: '/images/tests/software.jpg',
    publishedAt: '2026-07-10',
    type: 'final',
    status: 'approved'
  }
];
