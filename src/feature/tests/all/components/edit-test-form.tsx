import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useTeachers} from '@/api/teacher/api';
import {useCourses} from '@/api/course/api';
import {usePaginatedSelect} from '@/hooks/use-paginated-select';
import type {TLecturers} from '@/feature/lecturers/type';
import type {TCourse} from '@/feature/courses/type';
import {useTestById, useUpdateTest} from '@/api/tests/api';

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
  date: z.string().min(1, {
    message: 'التاريخ مطلوب'
  }),
  kind: z.number().min(0).max(2)
});

type TestFormValues = z.infer<typeof TestSchema>;

const EditTestForm = ({id, onClose}: {id: string; onClose: () => void}) => {
  const {sheet, setSheet} = useAppSheet();
  const {data: test, isLoading: isTestLoading} = useTestById(id, {
    select: data => data.data
  });
  const teachers = usePaginatedSelect<TLecturers>(useTeachers, t => t.name);
  const courses = usePaginatedSelect<TCourse>(useCourses, c => c.name);
  const {mutate: updateTest, isPending} = useUpdateTest();

  const form = useForm<TestFormValues>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      name: '',
      courseId: '',
      teacherId: '',
      date: '',
      kind: 0
    }
  });

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
    if (!isTestLoading && test) {
      form.reset({
        name: test.id,
        courseId: test.courseId,
        teacherId: test.teacherId,
        date: test.date,
        kind: test.kind
      });
    }
  }, [form, isTestLoading, test]);

  function onSubmit(values: TestFormValues) {
    updateTest(
      {
        id,
        data: {
          ...values,
          kind: Number(values.kind)
        }
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  }

  const isLoading = isTestLoading || teachers.isFirstLoading || courses.isFirstLoading;

  return (
    <form id='edit-test-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الاختبار' props={{readOnly: isLoading}} control={form.control} register={form.register('name')} />
          <SelectField label='المادة' onLoadMore={courses.loadMore} isLoadingMore={courses.isLoadingMore} control={form.control} register={{name: 'courseId'}} options={courses.options} placeholder={courses.isFirstLoading ? 'جاري التحميل...' : 'اختر المادة'} props={{disabled: isLoading, defaultValue: test?.courseName}} />
          <SelectField label='الدكتور' onLoadMore={teachers.loadMore} isLoadingMore={teachers.isLoadingMore} control={form.control} register={{name: 'teacherId'}} options={teachers.options} placeholder={teachers.isFirstLoading ? 'جاري التحميل...' : 'اختر الدكتور'} props={{disabled: isLoading, defaultValue: test?.teacherName}} />
          <InputField label='التاريخ' props={{readOnly: isLoading, type: 'date'}} control={form.control} register={form.register('date')} />
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

export default EditTestForm;
