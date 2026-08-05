import type {ColumnDef} from '@tanstack/react-table';

import type {TBreadcrumb} from '@/components/header';

import type {TIssue} from './type';

import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

import {Badge} from '@/components/ui/badge';

import {MoreHorizontal, Eye, Trash} from 'lucide-react';

import {Button} from '@/components/ui/button';

export const IssuesBreadcrumb: TBreadcrumb[] = [
  {
    title: 'الرئيسية',
    url: '/'
  },
  {
    title: 'الشكاوى',
    url: '/issues'
  }
];

import type {VariantProps} from 'class-variance-authority';
import {badgeVariants} from '@/components/ui/badge';

import type {TIssuePriority} from './type';

export const issuePriority: Record<
  TIssuePriority,
  {
    name: string;
    variant: VariantProps<typeof badgeVariants>['variant'];
  }
> = {
  low: {
    name: 'منخفضة',
    variant: 'secondary'
  },

  medium: {
    name: 'متوسطة',
    variant: 'default'
  },

  high: {
    name: 'عالية',
    variant: 'warning'
  },

  urgent: {
    name: 'عاجلة',
    variant: 'destructive'
  }
};

export const IssuesColumns: ColumnDef<TIssue>[] = [
  {
    accessorKey: 'title',
    header: 'نص الشكوى'
  },

  {
    accessorKey: 'description',
    header: 'وصف الشكوى',

    cell: ({row}) => <p className='max-w-75 truncate'>{row.original.description}</p>
  },
  {
    accessorKey: 'priority',

    header: 'الأولوية',

    cell: ({row}) => {
      const priority = issuePriority[row.original.priority];

      return <Badge variant={priority.variant}>{priority.name}</Badge>;
    }
  },

  {
    accessorKey: 'createdAt',
    header: 'تاريخ الإضافة'
  },

  {
    id: 'actions',

    header: 'الإجراءات',

    cell: () => (
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
              عرض
            </DropdownMenuItem>

            <DropdownMenuItem className='text-destructive'>
              <Trash className='ml-2 h-4 w-4' />
              حذف
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];

export const mockIssuesData: TIssue[] = [
  {
    id: '1',
    title: 'مشكلة في رفع الملف',

    description: 'لا أستطيع رفع ملف PDF الخاص بالمادة.',

    priority: 'high',

    createdAt: '2026-08-01'
  },

  {
    id: '2',
    title: 'خطأ في بيانات المادة',

    description: 'بيانات المادة لا تظهر بشكل صحيح.',

    priority: 'medium',

    createdAt: '2026-07-28'
  },

  {
    id: '3',
    title: 'مشكلة تسجيل الدخول',

    description: 'لا أستطيع الدخول إلى الحساب.',

    priority: 'urgent',

    createdAt: '2026-07-20'
  }
];
