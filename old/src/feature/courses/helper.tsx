import type {ColumnDef} from '@tanstack/react-table';
import type {TCourse} from './type';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {MoreHorizontal, Edit, Trash} from 'lucide-react';
import {Button} from '@/components/ui/button';
import type {TBreadcrumb} from '@/components/header';

export const CoursesBreadcrumb: TBreadcrumb[] = [
  {title: 'الرئيسية', url: '/'},
  {
    title: 'المادة',
    url: '/courses'
  }
];

export type CourseColumnsProps = {
  onUpdate: (id: string) => void;
  onDelete: ({id, name}: {id: string; name: string}) => void;
};

export function CourseColumns({onUpdate, onDelete}: CourseColumnsProps): ColumnDef<TCourse>[] {
  return [
    {
      accessorKey: 'name',
      header: 'اسم المادة'
    },
    {
      accessorKey: 'testsCount',
      header: 'عدد الاختبارات'
    },
    {
      accessorKey: 'filesCount',
      header: 'عدد الملازم'
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

              <DropdownMenuItem onClick={() => onUpdate(props.row.original.id)}>
                <Edit className='ml-2 h-4 w-4' />
                تعديل
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  onDelete({
                    id: props.row.original.id,
                    name: props.row.original.name
                  })
                }
                className='text-destructive'
              >
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
