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
  const {data: teachers, isLoading: isTeachersLoading} = useTeachers({page: 1, pageSize: 100}, {select: data => data.data.items});
  const {data: courses, isLoading: isCoursesLoading} = useCourses({page: 1, pageSize: 100}, {select: data => data.data.items});
  const {mutate: updateNote, isPending} = useUpdateNote();
  const teacherOptions =
    teachers?.map(teacher => ({
      label: teacher.name,
      value: teacher.id
    })) ?? [];
  const courseOptions =
    courses?.map(course => ({
      label: course.name,
      value: course.id
    })) ?? [];
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
  const isLoading = isNoteLoading || isTeachersLoading || isCoursesLoading;
  return (
    <form id='edit-memoir-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الملزمة' props={{readOnly: isLoading}} control={form.control} register={form.register('name')} />
          <SelectField label='المادة' control={form.control} register={{name: 'courseId'}} options={courseOptions} placeholder={isCoursesLoading ? 'جاري التحميل...' : 'اختر المادة'} props={{disabled: isLoading}} />
          <SelectField label='الدكتور' control={form.control} register={{name: 'teacherId'}} options={teacherOptions} placeholder={isTeachersLoading ? 'جاري التحميل...' : 'اختر الدكتور'} props={{disabled: isLoading}} />
          <InputField label='التاريخ' type='date' props={{readOnly: isLoading}} control={form.control} register={form.register('date')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
export default EditMemoirForm;
