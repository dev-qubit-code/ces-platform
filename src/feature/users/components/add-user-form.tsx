import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import * as z from 'zod';

import {FieldGroup, FieldSet} from '@/components/ui/field';

import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import type {TStatus, TUserType} from '../type';
import {useCreateUser} from '@/api/user';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';

const UserSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'
  }),

  email: z.string().email({
    message: 'البريد الإلكتروني غير صحيح'
  }),
  password: z.string().min(1, 'كلمة السر مطلوبة').min(8, 'كلمة السر يجب ان تكون اكثر من 8 احرف'),
  role: z.enum<TUserType[]>(['admin', 'manager']),
  status: z.enum<TStatus[]>(['active', 'inactive'])
});

export type UserFormValues = z.infer<typeof UserSchema>;

const AddUserForm = ({onClose}: {onClose: () => void}) => {
  const {mutate: createUser, isPending} = useCreateUser();
  const {sheet, setSheet} = useAppSheet();
  useEffect(() => {
    if (sheet)
      setSheet({
        ...sheet,
        primaryAction: {
          ...sheet.primaryAction!,
          disabled: isPending,
          text: isPending ? 'جاري الاضافة' : 'إضافة'
        },
        secondaryAction: {
          ...sheet.secondaryAction!,
          disabled: isPending
        }
      });
  }, [isPending]);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),

    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'manager',
      status: 'active'
    }
  });

  function onSubmit(values: UserFormValues) {
    console.log(values);
    createUser(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  return (
    <form id='create-user-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم المستخدم' control={form.control} register={form.register('name')} />
          <InputField label='البريد الإلكتروني' control={form.control} register={form.register('email')} />
          <InputField label='كلمة السر' control={form.control} register={form.register('password')} />
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
