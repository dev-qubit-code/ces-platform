import {DataTable} from '@/components/app-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Plus} from 'lucide-react';

import {useHeader} from '@/store/header-store';
import {useAppSheet} from '@/store/sheet-store';

import AddUserForm from './components/add-user-form';

import {UsersBreadcrumb, GetUsersColumns, userStatusMapper} from './helper';
import {useUsers} from '@/api/user';
import {useEffect, useState} from 'react';
import {usePagination} from '@/hooks/use-pagination';
import {useDebounce} from '@/hooks/use-debounce';
import EditUserForm from './components/edit-user-form';
import {useAppDialog} from '@/store/dialog-store';
import {PauseUserForm} from './components/pause-user';
import type {TStatus} from './type';
import {DeleteUserForm} from './components/delete-user';
import {useDeleteUser} from '@/api/user';
import {useUpdateUserStatus} from '@/api/user/api';

const Users = () => {
  const {setSheet, onClose} = useAppSheet();
  const {dialog, setDialog, onClose: onDialogClose} = useAppDialog();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);
  const {data: response, isLoading} = useUsers({page, pageSize, search: searchDebounce}, {select: data => data.data, placeholderData: preData => preData});
  const {mutate: deleteUserMutate, isPending: isDeleteUserPending} = useDeleteUser();
  const {mutate: updateUserStatus, isPending: isUpdateUserStatusPending} = useUpdateUserStatus();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const data = response?.items;
  const paginationProps = usePagination({pagination: response, setPage, setPageSize});
  setBreadcrumb(UsersBreadcrumb);
  // To Change Page to 1 when user searching
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchDebounce]);

  function onClick() {
    setSheet({
      title: 'إضافة مستخدم',

      description: 'أدخل بيانات المستخدم ثم اضغط حفظ.',

      content: <AddUserForm onClose={onClose} />,

      primaryAction: {
        text: 'إضافة',

        formId: 'create-user-form'
      },

      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }
  function onUpdate(id: string) {
    setSheet({
      title: 'تعديل المستخدم',

      description: 'أدخل بيانات المستخدم ثم اضغط حفظ.',

      content: <EditUserForm id={id} onClose={onClose} />,

      primaryAction: {
        text: 'تعديل',

        formId: 'update-user-form'
      },

      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }
  // Delete User Action
  useEffect(() => {
    if (dialog)
      setDialog({
        ...dialog,
        primaryAction: {
          ...dialog.primaryAction!,
          text: isDeleteUserPending ? 'جاري حذف المستخدم' : 'حذف المستخدم',
          disabled: isDeleteUserPending
        },
        secondaryAction: {
          ...dialog.secondaryAction!,
          disabled: isDeleteUserPending
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteUserPending]);

  function onDelete({id, name}: {id: string; name: string}) {
    setDialog({
      title: 'حذف المستخدم',
      description: 'هذا الإجراء لا يمكن التراجع عنه.',
      content: <DeleteUserForm name={name} />,
      primaryAction: {
        text: 'حذف المستخدم',
        className: 'bg-destructive hover:bg-destructive/90',
        onClick: () => {
          deleteUserMutate(
            {id},
            {
              onSuccess: () => {
                onDialogClose();
              }
            }
          );
        }
      },
      secondaryAction: {
        disabled: isDeleteUserPending,
        text: 'إلغاء'
      }
    });
  }
  // onUpdateStatus Action
  useEffect(() => {
    if (!dialog || !dialog.primaryAction) return;

    setDialog({
      ...dialog,
      primaryAction: {
        ...dialog.primaryAction!,
        text: isUpdateUserStatusPending ? 'جاري تحديث حالة المستخدم' : dialog.primaryAction.text,
        disabled: isUpdateUserStatusPending
      },
      secondaryAction: {
        ...dialog.secondaryAction!,
        disabled: isUpdateUserStatusPending
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateUserStatusPending]);

  function onUpdateStatus({id, name, status}: {id: string; name: string; status: TStatus}) {
    const statusInfo = userStatusMapper[status];

    setDialog({
      title: statusInfo.title,
      description: statusInfo.description,

      content: <PauseUserForm name={name} status={status} />,

      primaryAction: {
        text: statusInfo.actionLabel,
        className: status === 'active' ? 'bg-destructive hover:bg-destructive/90' : '',
        onClick: () => {
          updateUserStatus(
            {
              id,
              data: {
                // Active User when current Status is inActive
                isActive: status !== 'active'
              }
            },
            {
              onSuccess: () => {
                onDialogClose();
              }
            }
          );
        }
      },

      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }

  const UsersColumns = GetUsersColumns({onUpdate, onUpdateStatus, onDelete});

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>المستخدمين</h2>
          <p className='text-muted-foreground'>إدارة المستخدمين والصلاحيات والأدوار الخاصة بهم.</p>
        </div>

        <Button onClick={onClick}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة مستخدم
        </Button>
      </div>

      <div className='w-full'>
        <DataTable columns={UsersColumns} data={data || []} paginationProps={paginationProps} isLoading={isLoading} SearchElement={<Input value={search} onChange={val => setSearch(val.target.value)} placeholder='ابحث عن مستخدم...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Users;
