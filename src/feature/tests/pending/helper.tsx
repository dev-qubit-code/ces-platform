import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import type {TBreadcrumb} from '@/components/header';
import type {ColumnDef} from '@tanstack/react-table';
import {Check, EyeIcon, X} from 'lucide-react';
import {TestTypeStatus} from './type';
import type { TTest } from '../all/type';

export const PendingTestBreadcrumb: TBreadcrumb[] = [
  {title: 'الرئيسية', url: '/'},
  {
    title: 'الاختبارات',
    url: '/tests/all'
  },
  {title: 'المعلقة', url: '/tests/pending'}
];

interface PendingTestColumnsProps {
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const GetPendingTestColumns = ({onView, onApprove, onReject}: PendingTestColumnsProps): ColumnDef<TTest>[] => [
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
    id: 'actions',
    header: 'الإجراءات',
    cell: ({row}) => {
      const test = row.original;

      return (
        <div className='flex items-center gap-2'>
          <Button type='button' variant='outline' size='icon-lg' onClick={() => onView(test.id)}>
            <EyeIcon />
          </Button>

          <Button type='button' variant='outline' size='icon-lg' onClick={() => onApprove(test.id)}>
            <Check />
          </Button>

          <Button type='button' variant='destructive' size='icon-lg' onClick={() => onReject(test.id)}>
            <X />
          </Button>
        </div>
      );
    }
  }
];

