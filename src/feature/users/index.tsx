import {DataTable} from '@/components/app-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Plus} from 'lucide-react';

import {useHeader} from '@/store/header-store';
import {useAppSheet} from '@/store/sheet-store';

import AddUserForm from './components/add-user-form';

import {UsersBreadcrumb, UsersColumns, mockUsersData} from './helper';

const Users = () => {
  const {setSheet, onClose} = useAppSheet();

  const setBreadcrumb = useHeader(state => state.setBreadcrumb);

  setBreadcrumb(UsersBreadcrumb);

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
        <DataTable columns={UsersColumns} data={mockUsersData} SearchElement={<Input placeholder='ابحث عن مستخدم...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Users;
