import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import FileUploadField from '@/components/form/file-upload-field';

const MemoirSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم الملزمة يجب أن يكون 3 أحرف على الأقل'
  }),
  course: z.string().min(2, {
    message: 'اسم المادة مطلوب'
  }),
  lecturer: z.string().min(2, {
    message: 'اسم الدكتور مطلوب'
  }),
  file: z.instanceof(File, {
    message: 'يرجى اختيار ملف'
  })
});

type MemoirFormValues = z.infer<typeof MemoirSchema>;

const AddMemoirForm = ({onClose}: {onClose: () => void}) => {
  const form = useForm<MemoirFormValues>({
    resolver: zodResolver(MemoirSchema),
    defaultValues: {
      name: '',
      course: '',
      lecturer: ''
    }
  });

  function onSubmit(values: MemoirFormValues) {
    console.log(values);
    onClose();
  }

  return (
    <form id='create-memoir-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الملزمة' control={form.control} register={form.register('name')} />

          <InputField label='المادة' control={form.control} register={form.register('course')} />

          <InputField label='الدكتور' control={form.control} register={form.register('lecturer')} />

          <FileUploadField
            label='ملف الملزمة'
            control={form.control}
            register={{
              name: 'file'
            }}
            accept='.pdf,.png,.jpg,.jpeg'
          />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AddMemoirForm;
