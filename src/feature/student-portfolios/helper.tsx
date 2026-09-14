import type {TBreadcrumb} from '@/components/header';

import type {ColumnDef} from '@tanstack/react-table';

import type {TStudentPortfolio} from './type';

import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

import {Edit, Eye, MoreHorizontal, Trash} from 'lucide-react';

import {Button} from '@/components/ui/button';
import TechnologyList from '@/components/shared/technology-list';
import LinksList from '@/components/shared/links-list';
import {formatDate} from '@/lib/utils';

export const StudentPortfoliosBreadcrumb: TBreadcrumb[] = [
  {
    title: 'الرئيسية',
    url: '/'
  },
  {
    title: 'أعمال الطلاب',
    url: '/student-portfolios'
  }
];

interface StudentPortfoliosColumnsProps {
  onView: (student: TStudentPortfolio) => void;
  onEdit: (student: TStudentPortfolio) => void;
}
export function StudentPortfoliosColumns({onView, onEdit}: StudentPortfoliosColumnsProps): ColumnDef<TStudentPortfolio>[] {
  return [
    {
      accessorKey: 'studentName',
      header: 'اسم الطالب'
    },
    {
      accessorKey: 'specialization',
      header: 'التخصص'
    },
    {
      accessorKey: 'description',
      header: 'نبذة عنه',
      cell: ({row}) => <p className='max-w-xs truncate'>{row.original.description}</p>
    },

    {
      accessorKey: 'technologies',
      header: 'التقنيات',
      cell: ({row}) => <TechnologyList technologies={row.original.technologies} limit={3} />
    },
    {
      accessorKey: 'links',

      header: 'الروابط',

      cell: ({row}) => <LinksList links={row.original.links} />
    },

    {
      accessorKey: 'createdAt',
      header: 'تاريخ الإضافة',
      cell: ({row}) => {
        const createdAt = row.original.createdAt;
        return formatDate(createdAt);
      }
    },

    {
      id: 'actions',

      header: 'الإجراءات',

      cell: ({row}) => {
        const student = row.original;

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

                <DropdownMenuItem onClick={() => onView(student)}>
                  <Eye className='ml-2 h-4 w-4' />
                  عرض
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onEdit(student)}>
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
}
