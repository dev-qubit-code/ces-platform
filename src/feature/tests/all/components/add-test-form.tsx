import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useCreateTest} from '@/api/tests/api';
import {useTeachers} from '@/api/teacher/api';
import {useCourses} from '@/api/course/api';
import {usePaginatedSelect} from '@/hooks/use-paginated-select';
import type {TLecturers} from '@/feature/lecturers/type';
import type {TCourse} from '@/feature/courses/type';

const TestSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم الاختبار يجب أن يكون 3 أحرف على الأقل'
  }),
  courseId: z.string().min(1, {
    message: 'المادة مطلوبة'
  }),
  teacherId: z.string().min(1, {
    message: 'الدكتور مطلوب'
  }),
  testDate: z.string().min(1, {
    message: 'التاريخ مطلوب'
  }),
  kind: z.coerce.number<number>().min(0).max(2)
});

export type TestFormValues = z.infer<typeof TestSchema>;

const AddTestForm = ({onClose}: {onClose: () => void}) => {
  const {sheet, setSheet} = useAppSheet();

  const form = useForm<TestFormValues>({
    resolver: zodResolver(TestSchema),
    defaultValues: {name: '', courseId: '', teacherId: '', testDate: '', kind: 0}
  });

  const {mutate: createTest, isPending} = useCreateTest();
  const teachers = usePaginatedSelect<TLecturers>(useTeachers, t => t.name);
  const courses = usePaginatedSelect<TCourse>(useCourses, c => c.name);

  const isLoading = isPending || teachers.isFirstLoading || courses.isFirstLoading;

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

  function onSubmit(values: TestFormValues) {
    createTest(
      {
        ...values,
        kind: Number(values.kind)
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  }

  return (
    <form id='create-test-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الاختبار' control={form.control} register={form.register('name')} props={{disabled: isLoading}} />

          <SelectField label='المادة' onLoadMore={courses.loadMore} isLoadingMore={courses.isLoadingMore} control={form.control} register={{name: 'courseId'}} options={courses.options} placeholder={courses.isFirstLoading ? 'جاري التحميل...' : 'اختر المادة'} props={{disabled: isLoading}} />

          <SelectField label='الدكتور' onLoadMore={teachers.loadMore} isLoadingMore={teachers.isLoadingMore} control={form.control} register={{name: 'teacherId'}} options={teachers.options} placeholder={teachers.isFirstLoading ? 'جاري التحميل...' : 'اختر الدكتور'} props={{disabled: isLoading}} />

          <InputField label='التاريخ' control={form.control} register={form.register('testDate')} props={{type: 'date', disabled: isLoading}} />

          <SelectField
            label='نوع الاختبار'
            control={form.control}
            register={{name: 'kind'}}
            options={[
              {label: 'شهري', value: '0'},
              {label: 'نصفي', value: '1'},
              {label: 'نهائي', value: '2'}
            ]}
            placeholder='اختر نوع الاختبار'
            props={{disabled: isLoading}}
          />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default AddTestForm;
