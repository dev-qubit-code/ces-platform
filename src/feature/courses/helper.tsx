import type {ColumnDef} from '@tanstack/react-table';
import type {TCourse} from './type';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {MoreHorizontal, Edit, Trash} from 'lucide-react';
import {Button} from '@/components/ui/button';

export const CourseColumns: ColumnDef<TCourse>[] = [
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
    cell: () => {
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
              <DropdownMenuItem>
                <Edit className='ml-2 h-4 w-4' /> تعديل
              </DropdownMenuItem>
              <DropdownMenuItem className='text-destructive'>
                <Trash className='ml-2 h-4 w-4' /> حذف
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export const mockCourseData: TCourse[] = [
  {id: '1', name: 'هندسة برمجيات', testsCount: 15, filesCount: 8},
  {id: '2', name: 'قواعد بيانات 2', testsCount: 5, filesCount: 22},
  {id: '3', name: 'تراكيب بيانات', testsCount: 12, filesCount: 10}
];
