import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useCreateTeacher} from '@/api/teacher/api';

const LecturersSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم الدكتور يجب أن يكون 3 أحرف على الأقل'
  })
});
export type LecturersFormValues = z.infer<typeof LecturersSchema>;

const AddLecturersForm = ({onClose}: {onClose: () => void}) => {
  const {mutate: createTeacher, isPending} = useCreateTeacher();

  const {sheet, setSheet} = useAppSheet();

  useEffect(() => {
    if (sheet)
      setSheet({
        ...sheet,
        primaryAction: {
          ...sheet.primaryAction!,
          disabled: isPending,
          text: isPending ? 'جاري الإضافة' : 'إضافة'
        },
        secondaryAction: {
          ...sheet.secondaryAction!,
          disabled: isPending
        }
      });
  }, [isPending]);

  const form = useForm<LecturersFormValues>({
    resolver: zodResolver(LecturersSchema),
    defaultValues: {
      name: ''
    }
  });

  function onSubmit(values: LecturersFormValues) {
    createTeacher(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }
  return (
    <form id='create-lecturers-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الدكتور' control={form.control} register={form.register('name')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AddLecturersForm;
