import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useCourseById, useUpdateCourse} from '@/api/course/api';

const courseSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم المادة يجب أن يكون 3 أحرف على الأقل'
  })
});

export type UpdateCourseFormValues = z.infer<typeof courseSchema>;

const EditCourseForm = ({id, onClose}: {id: string; onClose: () => void}) => {
  const {sheet, setSheet} = useAppSheet();

  const {data: courseData, isLoading} = useCourseById(id, {
    select: data => data.data
  });

  const {mutate: updateCourseMutate, isPending} = useUpdateCourse();

  const form = useForm<UpdateCourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: ''
    }
  });

  function onSubmit(values: UpdateCourseFormValues) {
    if (!isLoading)
      updateCourseMutate(
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
    if (!isLoading && courseData) {
      form.reset({
        name: courseData.name
      });
    }
  }, [form, isLoading, courseData]);

  return (
    <form id='edit-course-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم المادة' props={{readOnly: isLoading}} control={form.control} register={form.register('name')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default EditCourseForm;
