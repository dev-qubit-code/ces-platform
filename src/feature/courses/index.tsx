import {DataTable} from '@/components/app-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Plus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useAppSheet} from '@/store/sheet-store';
import {useHeader} from '@/store/header-store';
import AddCourseForm from './components/add-course-form';
import {CourseColumns, CoursesBreadcrumb} from './helper';
import {useCourses} from '@/api/course/api';
import {usePagination} from '@/hooks/use-pagination';
import {useDebounce} from '@/hooks/use-debounce';

const Courses = () => {
  const {setSheet, onClose} = useAppSheet();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const searchDebounce = useDebounce(search);

  const {data: response, isLoading} = useCourses(
    {
      page,
      pageSize,
      search: searchDebounce
    },
    {
      select: data => data.data,
      placeholderData: preData => preData
    }
  );

  const paginationProps = usePagination({
    pagination: response,
    setPage,
    setPageSize
  });

  const data = response?.items;

  setBreadcrumb(CoursesBreadcrumb);

  // To change page to 1 when searching
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchDebounce]);

  function onCreate() {
    setSheet({
      title: 'إضافة مادة',
      description: 'أدخل بيانات المادة الجديدة ثم اضغط حفظ.',
      content: <AddCourseForm onClose={onClose} />,
      primaryAction: {
        text: 'إضافة',
        formId: 'create-course-form'
      },
      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>المواد الدراسية</h2>
          <p className='text-muted-foreground'>إدارة المواد الدراسية المستخدمة لتصنيف الاختبارات والملازم في النظام.</p>
        </div>

        <Button onClick={onCreate}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة مادة
        </Button>
      </div>

      <div className='w-full'>
        <DataTable columns={CourseColumns} data={data || []} paginationProps={paginationProps} isLoading={isLoading} SearchElement={<Input value={search} onChange={event => setSearch(event.target.value)} placeholder='ابحث عن مادة...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Courses;
