import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useCreateCourse} from '@/api/course/api';

const CourseSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم المادة يجب أن يكون 3 أحرف على الأقل'
  })
});

export type CourseFormValues = z.infer<typeof CourseSchema>;

const AddCourseForm = ({onClose}: {onClose: () => void}) => {
  const {mutate: createCourse, isPending} = useCreateCourse();

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

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      name: ''
    }
  });

  function onSubmit(values: CourseFormValues) {
    createCourse(values, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  return (
    <form id='create-course-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم المادة' control={form.control} register={form.register('name')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AddCourseForm;
