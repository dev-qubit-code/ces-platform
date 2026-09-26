import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNoteById} from '@/api/notes/api';
import {useTeachers} from '@/api/teacher/api';
import {useCourses} from '@/api/course/api';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import type {TLecturers} from '@/feature/lecturers/type';
import type {TCourse} from '@/feature/courses/type';
import {PAGE_SIZE} from '@/lib/constant';

type ViewMemoirFormValues = {
  name: string;
  courseId: string;
  teacherId: string;
  date: string;
};

const ViewMemoirForm = ({id}: {id: string}) => {
  const {data: note, isLoading: isNoteLoading} = useNoteById(id, {
    select: data => data.data
  });

  const [teacherPage, setTeacherPage] = useState(1);
  const [allTeachers, setAllTeachers] = useState<TLecturers[]>([]);
  const [coursePage, setCoursePage] = useState(1);
  const [allCourses, setAllCourses] = useState<TCourse[]>([]);
  const form = useForm<ViewMemoirFormValues>({
    defaultValues: {name: '', courseId: '', teacherId: '', date: ''}
  });
  const {data: teachersRes, isLoading: isTeachersLoading, isFetching: isTeachersFetching} = useTeachers({page: teacherPage, pageSize: PAGE_SIZE}, {select: data => data.data});
  const {data: coursesRes, isLoading: isCoursesLoading, isFetching: isCoursesFetching} = useCourses({page: coursePage, pageSize: PAGE_SIZE}, {select: data => data.data});

  useEffect(() => {
    if (!teachersRes) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllTeachers(prev => {
      if (teachersRes.currentPage === 1) return teachersRes.items;
      const existingIds = new Set(prev.map(t => t.id));
      const newOnes = teachersRes.items.filter(t => !existingIds.has(t.id));
      return [...prev, ...newOnes];
    });
  }, [teachersRes]);

  useEffect(() => {
    if (!coursesRes) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAllCourses(prev => {
      if (coursesRes.currentPage === 1) return coursesRes.items;
      const existingIds = new Set(prev.map(c => c.id));
      const newOnes = coursesRes.items.filter(c => !existingIds.has(c.id));
      return [...prev, ...newOnes];
    });
  }, [coursesRes]);

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

  const handleLoadMoreTeachers = () => {
    if (!isTeachersFetching && teachersRes?.hasNextPage) {
      setTeacherPage(prev => prev + 1);
    }
  };
  const handleLoadMoreCourses = () => {
    if (!isCoursesFetching && coursesRes?.hasNextPage) {
      setCoursePage(prev => prev + 1);
    }
  };

  const teacherOptions = allTeachers.map(teacher => ({
    label: teacher.name,
    value: teacher.id
  }));

  const courseOptions = allCourses.map(course => ({
    label: course.name,
    value: course.id
  }));

  const isLoading = isNoteLoading || (isTeachersLoading && teacherPage === 1) || (isCoursesLoading && coursePage === 1);

  return (
    <form>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الملزمة' control={form.control} register={form.register('name')} props={{readOnly: true, disabled: isLoading}} />

          <SelectField label='المادة' control={form.control} isLoadingMore={isCoursesLoading} register={{name: 'courseId'}} options={courseOptions} onLoadMore={handleLoadMoreCourses} placeholder={isCoursesLoading ? 'جاري التحميل...' : 'اختر المادة'} props={{readOnly: true, disabled: isLoading}} />

          <SelectField label='الدكتور' control={form.control} isLoadingMore={isTeachersLoading} register={{name: 'teacherId'}} options={teacherOptions} onLoadMore={handleLoadMoreTeachers} placeholder={isTeachersLoading ? 'جاري التحميل...' : 'اختر الدكتور'} props={{readOnly: true, disabled: isLoading}} />

          <InputField label='التاريخ' control={form.control} register={form.register('date')} props={{readOnly: true, disabled: isLoading, type: 'date'}} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ViewMemoirForm;
