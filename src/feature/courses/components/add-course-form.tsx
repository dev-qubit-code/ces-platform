import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
const CourseSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم المادة يجب أن يكون 3 أحرف على الأقل'
  })
});

type CourseFormValues = z.infer<typeof CourseSchema>;

const AddCourseForm = ({onClose}:{onClose: () => void}) => {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      name: ''
    }
  });

  function onSubmit(values: CourseFormValues) {
    console.log(values);
    onClose();
  }

  return (
    <form id='create-course-form' {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet className=''>
        <FieldGroup>
          <InputField label='اسم المادة' control={form.control} register={form.register('name')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AddCourseForm;
