import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import * as z from 'zod';

import {FieldGroup, FieldSet} from '@/components/ui/field';

import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import type {TStatus, TUserType} from '../type';

const UserSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'
  }),

  email: z.string().email({
    message: 'البريد الإلكتروني غير صحيح'
  }),

  role: z.enum<TUserType[]>(['admin', 'manager']),
  status: z.enum<TStatus[]>(['active', 'inactive'])
});

type UserFormValues = z.infer<typeof UserSchema>;

const AddUserForm = ({onClose}: {onClose: () => void}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),

    defaultValues: {
      name: '',
      email: '',
      role: 'manager',
      status: 'active'
    }
  });

  function onSubmit(values: UserFormValues) {
    console.log(values);

    onClose();
  }

  return (
    <form id='create-user-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم المستخدم' control={form.control} register={form.register('name')} />
          <InputField label='البريد الإلكتروني' control={form.control} register={form.register('email')} />
          <SelectField
            label='الصلاحية'
            control={form.control}
            register={{
              name: 'role'
            }}
            placeholder='اختر الصلاحية'
            options={
              [
                {
                  label: 'مدير',
                  value: 'manager'
                },
                {
                  label: 'ادمن',
                  value: 'admin'
                }
              ] as {label: string; value: TUserType}[]
            }
          />
          <SelectField
            label='الحالة'
            control={form.control}
            register={{
              name: 'status'
            }}
            placeholder='اختر الحالة'
            options={
              [
                {
                  label: 'مفعل',
                  value: 'active'
                },
                {
                  label: 'موقف',
                  value: 'inactive'
                }
              ] as {label: string; value: TStatus}[]
            }
          />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AddUserForm;
