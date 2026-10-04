import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import type {TBreadcrumb} from '@/components/header';
import type {ColumnDef} from '@tanstack/react-table';
import {Check, Eye, MoreHorizontal, X} from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
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
    accessorKey: 'lecturer',
    header: 'اسم الدكتور / دكتورة'
  },
  {
    accessorKey: 'name',
    header: 'اسم المادة'
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent dir='rtl' align='end'>
            <DropdownMenuGroup>
              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(test.id)}>
                <Eye className='ml-2 h-4 w-4' />
                عرض الاختبار
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onApprove(test.id)}>
                <Check className='ml-2 h-4 w-4' />
                اعتماد الاختبار
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onReject(test.id)} className='text-destructive'>
                <X className='ml-2 h-4 w-4' />
                رفض الاختبار
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
