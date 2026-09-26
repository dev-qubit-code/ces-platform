import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect} from 'react';
import {useNoteById, useUpdateNote} from '@/api/notes/api';
import {useTeachers} from '@/api/teacher/api';
import {useCourses} from '@/api/course/api';
import {usePaginatedSelect} from '@/hooks/use-paginated-select';
import type {TLecturers} from '@/feature/lecturers/type';
import type {TCourse} from '@/feature/courses/type';

const MemoirSchema = z.object({
  name: z.string().min(3, {
    message: 'اسم الملزمة يجب أن يكون 3 أحرف على الأقل'
  }),
  courseId: z.string().min(1, {
    message: 'المادة مطلوبة'
  }),
  teacherId: z.string().min(1, {
    message: 'الدكتور مطلوب'
  }),
  date: z.string().min(1, {
    message: 'التاريخ مطلوب'
  })
});

type MemoirFormValues = z.infer<typeof MemoirSchema>;
const EditMemoirForm = ({id, onClose}: {id: string; onClose: () => void}) => {
  const {sheet, setSheet} = useAppSheet();
  const {data: note, isLoading: isNoteLoading} = useNoteById(id, {
    select: data => data.data
  });
  const teachers = usePaginatedSelect<TLecturers>(useTeachers, t => t.name);
  const courses = usePaginatedSelect<TCourse>(useCourses, c => c.name);
  const {mutate: updateNote, isPending} = useUpdateNote();
  const form = useForm<MemoirFormValues>({
    resolver: zodResolver(MemoirSchema),
    defaultValues: {
      name: '',
      courseId: '',
      teacherId: '',
      date: ''
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
    if (!isNoteLoading && note) {
      form.reset({
        name: note.name,
        courseId: note.courseId,
        teacherId: note.teacherId,
        date: note.date
      });
    }
  }, [form, isNoteLoading, note]);
  function onSubmit(values: MemoirFormValues) {
    updateNote(
      {
        id,
        data: values
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  }
  const isLoading = isNoteLoading || teachers.isFirstLoading || courses.isFirstLoading;
  return (
    <form id='edit-memoir-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الملزمة' props={{readOnly: isLoading}} control={form.control} register={form.register('name')} />
          <SelectField label='المادة' onLoadMore={courses.loadMore} isLoadingMore={courses.isLoadingMore} control={form.control} register={{name: 'courseId'}} options={courses.options} placeholder={courses.isFirstLoading ? 'جاري التحميل...' : 'اختر المادة'} props={{disabled: isLoading}} />
          <SelectField label='الدكتور' onLoadMore={teachers.loadMore} isLoadingMore={teachers.isLoadingMore} control={form.control} register={{name: 'teacherId'}} options={teachers.options} placeholder={teachers.isFirstLoading ? 'جاري التحميل...' : 'اختر الدكتور'} props={{disabled: isLoading}} />
          <InputField label='التاريخ' props={{readOnly: isLoading, type: 'date'}} control={form.control} register={form.register('date')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
export default EditMemoirForm;
