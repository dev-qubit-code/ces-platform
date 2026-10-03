import type {ColumnDef} from '@tanstack/react-table';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Edit, Eye, MoreHorizontal, Trash} from 'lucide-react';
import type {TBreadcrumb} from '@/components/header';
import {formatDate} from '@/lib/utils';
import {TestStatus, TestTypeStatus, type TTest} from './type';
import {Badge} from '@/components/ui/badge';

export const AllTestBreadcrumb: TBreadcrumb[] = [
  {title: 'الرئيسية', url: '/'},
  {title: 'الاختبارات', url: '/tests/all'}
];

interface GetTestColumnsProps {
  onView: (id: string) => void;
  onUpdate: (id: string) => void;
  onDelete: ({id, name}: {id: string; name: string}) => void;
}

export function GetTestColumns({onView, onUpdate, onDelete}: GetTestColumnsProps): ColumnDef<TTest>[] {
  return [
    {
      accessorKey: 'name',
      header: 'اسم الاختبار'
    },
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
              <DropdownMenuItem onClick={() => onDelete({id: props.row.original.id, name: props.row.original.name})} className='text-destructive'>
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
