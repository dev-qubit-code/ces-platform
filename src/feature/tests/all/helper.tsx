import type {ColumnDef} from '@tanstack/react-table';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {CheckCircle, Edit, Eye, MoreHorizontal, Pause, Trash} from 'lucide-react';
import type {TBreadcrumb} from '@/components/header';
import {formatDate} from '@/lib/utils';
import {TestStatus, TestTypeStatus, type TTest} from './type';
import {Badge} from '@/components/ui/badge';
import {TEST_STATUS, TEST_STATUS_MAPPER} from '@/enum/test-status.enum';
import {IconCircleX} from '@tabler/icons-react';

export const AllTestBreadcrumb: TBreadcrumb[] = [
  {title: 'الرئيسية', url: '/'},
  {title: 'الاختبارات', url: '/tests/all'}
];

interface GetTestColumnsProps {
  onView: (id: string) => void;
  onUpdate: (id: string) => void;
  onDelete: ({id}: {id: string}) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onPending: (id: string) => void;
}

export function GetTestColumns({onView, onUpdate, onDelete, onApprove, onReject, onPending}: GetTestColumnsProps): ColumnDef<TTest>[] {
  return [
    {
      accessorKey: 'lecturer',
      header: 'اسم الدكتور / دكتورة'
    },
    {
      accessorKey: 'course',
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
      header: 'تاريخ الاختبار',
      cell: ({row}) => formatDate(row.original.publishedAt)
    },
    {
      accessorKey: 'status',
      header: 'حالة الاختبار',
      cell: ({row}) => {
        const status = row.original.status;
        const {name, variant} = TestStatus[status];
        return <Badge variant={variant}>{name}</Badge>;
      }
    },
    {
      id: 'actions',
      header: 'الإجراءات',
      cell: props => (
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
              <DropdownMenuItem onClick={() => onView(props.row.original.id)}>
                <Eye className='ml-2 h-4 w-4' />
                عرض الاختبار
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate(props.row.original.id)}>
                <Edit className='ml-2 h-4 w-4' />
                تعديل
              </DropdownMenuItem>
              {(props.row.original.status === TEST_STATUS_MAPPER[TEST_STATUS.notApproved] || props.row.original.status === TEST_STATUS_MAPPER[TEST_STATUS.pending]) && (
                <DropdownMenuItem onClick={() => onApprove(props.row.original.id)} className='text-success'>
                  <CheckCircle className='ml-2 h-4 w-4' />
                  اعتماد الاختبار
                </DropdownMenuItem>
              )}
              {(props.row.original.status === TEST_STATUS_MAPPER[TEST_STATUS.approved] || props.row.original.status === TEST_STATUS_MAPPER[TEST_STATUS.pending]) && (
                <DropdownMenuItem onClick={() => onReject(props.row.original.id)} className='text-destructive'>
                  <IconCircleX className='ml-2 h-4 w-4' />
                  رفض الاختبار
                </DropdownMenuItem>
              )}
              {props.row.original.status !== TEST_STATUS_MAPPER[TEST_STATUS.pending] && (
                <DropdownMenuItem onClick={() => onPending(props.row.original.id)}>
                  <Pause className='ml-2 h-4 w-4' />
                  تعليق الاختبار
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete({id: props.row.original.id})} className='text-destructive'>
                <Trash className='ml-2 h-4 w-4' />
                حذف
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
}
