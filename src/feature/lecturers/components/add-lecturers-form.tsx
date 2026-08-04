import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
const lecturersSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم الدكتور يجب أن يكون 3 أحرف على الأقل'
  })
});

type LecturersFormValues = z.infer<typeof lecturersSchema>;

const AddLecturersForm = ({onClose}: {onClose: () => void}) => {
  const form = useForm<LecturersFormValues>({
    resolver: zodResolver(lecturersSchema),
    defaultValues: {
      name: ''
    }
  });

  function onSubmit(values: LecturersFormValues) {
    console.log(values);
    onClose();
  }

  return (
    <form id='create-lecturers-form' {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet className=''>
        <FieldGroup>
          <InputField label='اسم الدكتور' control={form.control} register={form.register('name')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AddLecturersForm;
