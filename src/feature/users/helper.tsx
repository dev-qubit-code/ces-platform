import type {ColumnDef} from '@tanstack/react-table';

import type {TStatus, TUser, TUserType} from './type';

import type {TBreadcrumb} from '@/components/header';

import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

import {Badge, badgeVariants} from '@/components/ui/badge';

import {MoreHorizontal, Edit, Trash, StopCircleIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import type {VariantProps} from 'class-variance-authority';

export const UsersBreadcrumb: TBreadcrumb[] = [
  {
    title: 'الرئيسية',
    url: '/'
  },
  {
    title: 'المستخدمين',
    url: '/users'
  }
];
const userRoleStatus: Record<TUserType, {name: string; variant: VariantProps<typeof badgeVariants>['variant']}> = {
  manager: {
    name: 'مدير',
    variant: 'success'
  },
  admin: {
    name: 'ادمن',
    variant: 'warning'
  }
};
const userStatus: Record<TStatus, {name: string; variant: VariantProps<typeof badgeVariants>['variant']}> = {
  active: {
    name: 'مفعل',
    variant: 'success'
  },
  inactive: {
    name: 'موقف',
    variant: 'destructive'
  }
};

export const UsersColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: 'name',
    header: 'اسم المستخدم'
  },

  {
    accessorKey: 'email',
    header: 'البريد الإلكتروني'
  },

  {
    accessorKey: 'role',
    header: 'الصلاحية',

    cell: ({row}) => {
      const role = row.original.role;
      const {name, variant} = userRoleStatus[role];
      return <Badge variant={variant}>{name}</Badge>;
    }
  },

  {
    accessorKey: 'createdAt',
    header: 'تاريخ الانضمام'
  },
  {
    accessorKey: 'status',

    header: 'الحالة',

    cell: ({row}) => {
      const status = row.original.status;
      const {name, variant} = userStatus[status];
      return <Badge variant={variant}>{name}</Badge>;
    }
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
              <Edit className='ml-2 h-4 w-4' />
              تعديل
            </DropdownMenuItem>

            <DropdownMenuItem className='text-destructive'>
              <StopCircleIcon className='ml-2 h-4 w-4' />
              توقيف
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

export const mockUsersData: TUser[] = [
  {
    id: '1',
    name: 'عبدالرحمن',
    email: 'abdo@test.com',
    role: 'admin',
    status: 'active',
    createdAt: '2026-08-01'
  },

  {
    id: '2',
    name: 'محمد',
    email: 'mohamed@test.com',
    role: 'manager',
    status: 'inactive',
    createdAt: '2026-07-20'
  }
];
