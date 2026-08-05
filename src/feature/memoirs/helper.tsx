import type {ColumnDef} from '@tanstack/react-table';
import type {TMemoir} from './type';

import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

import {Button} from '@/components/ui/button';
import {Edit, Eye, MoreHorizontal, Trash} from 'lucide-react';

import type {TBreadcrumb} from '@/components/header';

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

export const MemoirsColumns: ColumnDef<TMemoir>[] = [
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
    id: 'actions',
    header: 'الإجراءات',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent dir='rtl' align='end'>
            <DropdownMenuGroup>
              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className='ml-2 h-4 w-4' />
                عرض الملزمة
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className='ml-2 h-4 w-4' />
                تعديل
              </DropdownMenuItem>

              <DropdownMenuItem className='text-destructive'>
                <Trash className='ml-2 h-4 w-4' />
                حذف
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export const mockMemoirsData: TMemoir[] = [
  {
    id: '1',
    name: 'ملزمة هندسة البرمجيات',
    course: 'هندسة البرمجيات',
    lecturer: 'د. أحمد محمد'
  },
  {
    id: '2',
    name: 'ملزمة قواعد البيانات',
    course: 'قواعد البيانات 2',
    lecturer: 'د. خالد سعيد'
  },
  {
    id: '3',
    name: 'ملزمة تراكيب البيانات',
    course: 'تراكيب البيانات',
    lecturer: 'د. محمد علي'
  }
];
