import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import * as z from 'zod';

import {FieldGroup, FieldSet} from '@/components/ui/field';

import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import type {TStatus, TUserType} from '../type';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useUpdateUser, useUserById} from '@/api/user';

const UserSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'
  }),

  email: z.string().email({
    message: 'البريد الإلكتروني غير صحيح'
  }),
  password: z.string().refine(value => value === '' || value.length >= 8, {
    message: 'كلمة السر يجب أن تكون 8 أحرف على الأقل'
  }),
  role: z.enum<TUserType[]>(['admin', 'manager']),
  status: z.enum<TStatus[]>(['active', 'inactive'])
});

export type UpdateUserFormValues = z.infer<typeof UserSchema>;

const EditUserForm = ({id, onClose}: {id: string; onClose: () => void}) => {
  const {sheet, setSheet} = useAppSheet();
  const {data: userData, isLoading} = useUserById(id, {select: data => data.data});
  const {mutate: updateUserMutate, isPending} = useUpdateUser();

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'manager',
      status: 'active'
    }
  });

  function onSubmit(values: UpdateUserFormValues) {
    if (!isLoading)
      updateUserMutate(
        {id, data: values},
        {
          onSuccess: () => {
            onClose();
          }
        }
      );
  }

  useEffect(() => {
    if (sheet)
      setSheet({
        ...sheet,
        primaryAction: {
          ...sheet.primaryAction!,
          disabled: isPending,
          text: isPending ? 'جاري التعديل' : 'تعديل'
        },
        secondaryAction: {
          ...sheet.secondaryAction!,
          disabled: isPending
        }
      });
  }, [isPending]);

  useEffect(() => {
    if (!isLoading && userData) form.setValues(userData);
  }, [form, isLoading, userData]);
  return (
    <form id='update-user-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم المستخدم' props={{readOnly: isLoading}} control={form.control} register={form.register('name')} />
          <InputField label='البريد الإلكتروني' props={{readOnly: isLoading}} control={form.control} register={form.register('email')} />
          <InputField label='كلمة السر' props={{readOnly: isLoading}} control={form.control} register={form.register('password')} />
          <SelectField
            label='الصلاحية'
            control={form.control}
            props={{readOnly: isLoading}}
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
            props={{readOnly: isLoading}}
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

export default EditUserForm;
