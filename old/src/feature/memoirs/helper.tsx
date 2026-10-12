import type {ColumnDef} from '@tanstack/react-table';
import type {TMemoir} from './type';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Edit, Eye, MoreHorizontal, Trash} from 'lucide-react';
import type {TBreadcrumb} from '@/components/header';
import {formatDate} from '@/lib/utils';
export const MemoirsBreadcrumb: TBreadcrumb[] = [
  {
    title: 'الرئيسية',
    url: '/'
  },
  {
    title: 'الملازم',
    url: '/memoirs'
  }
];
interface GetMemoirsColumnsProps {
  onView: (id: string) => void;
  onUpdate: (id: string) => void;
  onDelete: ({id, name}: {id: string; name: string}) => void;
}
export function GetMemoirsColumns({onView, onUpdate, onDelete}: GetMemoirsColumnsProps): ColumnDef<TMemoir>[] {
  return [
    {
      accessorKey: 'name',
      header: 'اسم الملزمة'
    },
    {
      accessorKey: 'course',
      header: 'المادة'
    },
    {
      accessorKey: 'lecturer',
      header: 'الدكتور'
    },
    {
      accessorKey: 'date',
      header: 'التاريخ',
      cell: ({row}) => {
        const date = row.original.date;
        return formatDate(date);
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
                عرض الملزمة
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
