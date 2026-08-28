import type {ColumnDef} from '@tanstack/react-table';

import type {TStatus, TUser, TUserType} from './type';

import type {TBreadcrumb} from '@/components/header';

import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

import {Badge, badgeVariants} from '@/components/ui/badge';

import {MoreHorizontal, Edit, Trash, StopCircleIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import type {VariantProps} from 'class-variance-authority';
import {cn, formatDate} from '@/lib/utils';

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
interface GetUsersColumnsProps {
  onUpdate: (id: string) => void;
  onPause: ({name, status}: {name: string; status: TStatus}) => void;
  onDelete: ({id, name}: {id: string; name: string}) => void;
}

export function GetUsersColumns({onUpdate, onPause, onDelete}: GetUsersColumnsProps): ColumnDef<TUser>[] {
  return [
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
      header: 'تاريخ الانضمام',
      cell: props => {
        const createAt = props.row.original.createdAt;
        return formatDate(createAt, 'dd/MM/yyyy - hh:mm a');
      }
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

      cell: props => (
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

              <DropdownMenuItem onClick={() => onUpdate(props.row.original.id)}>
                <Edit className='ml-2 h-4 w-4' />
                تعديل
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  onPause({name: props.row.original.name, status: props.row.original.status});
                }}
                className={cn(props.row.original.status == 'active' ? 'text-destructive' : 'text-primary')}
              >
                <StopCircleIcon className='ml-2 h-4 w-4' />
                {props.row.original.status == 'active' ? 'توقيف' : 'تفعيل'}
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

export const userStatusMapper = {
  active: {
    label: 'مفعّل',
    actionLabel: 'إيقاف المستخدم',
    title: 'إيقاف المستخدم',
    description: 'سيتم إيقاف الوصول إلى الحساب.',
    messageTitle: 'هل تريد إيقاف هذا الحساب؟',
    message: 'سيتم منع المستخدم من تسجيل الدخول والوصول إلى النظام. ويمكن إعادة تفعيل الحساب لاحقًا.',
    badgeVariant: 'default' as const
  },

  inactive: {
    label: 'موقوف',
    actionLabel: 'تفعيل المستخدم',
    title: 'تفعيل المستخدم',
    description: 'سيتم إعادة تفعيل الوصول إلى الحساب.',
    messageTitle: 'هل تريد تفعيل هذا الحساب؟',
    message: 'سيتمكن المستخدم من تسجيل الدخول والوصول إلى النظام مرة أخرى.',
    badgeVariant: 'secondary' as const
  }
} satisfies Record<TStatus, object>;
