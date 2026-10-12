import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useTeacherById, useUpdateTeacher} from '@/api/teacher/api';

const lecturersSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم الدكتور يجب أن يكون 3 أحرف على الأقل'
  })
});

export type UpdateLecturersFormValues = z.infer<typeof lecturersSchema>;

const EditLecturersForm = ({id, onClose}: {id: string; onClose: () => void}) => {
  const {sheet, setSheet} = useAppSheet();
  const {data: teacherData, isLoading} = useTeacherById(id, {select: data => data.data});
  const {mutate: updateTeacherMutate, isPending} = useUpdateTeacher();

  const form = useForm<UpdateLecturersFormValues>({
    resolver: zodResolver(lecturersSchema),
    defaultValues: {
      name: ''
    }
  });

  function onSubmit(values: UpdateLecturersFormValues) {
    if (!isLoading)
      updateTeacherMutate(
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
    if (!isLoading && teacherData) form.reset({name: teacherData.name});
  }, [form, isLoading, teacherData]);

  return (
    <form id='edit-lecturers-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الدكتور' props={{readOnly: isLoading}} control={form.control} register={form.register('name')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default EditLecturersForm;
