'use client';
import BrandBox from '@/components/brand-box';
import Input from '@/components/input';
import Select from '@/components/select';
import {Button} from '@repo/ui/components/ui/button';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import {useDebounce} from '@repo/ui/hooks/use-debounce';
const courses: {label: string; value: string}[] = [
  {label: 'الكل', value: 'all'},
  {label: 'Data Structures', value: 'data-structures'},
  {label: 'الدوائر المنطقية', value: 'logic-circuits'},
  {label: 'البرمجة بلغة C', value: 'c-programming'},
  {label: 'البرمجة بلغة C++', value: 'cpp-programming'}
];
const lectures = [
  {label: 'الكل', value: 'all'},
  {label: 'د.خالد فوزي', value: 'khaled-fawzy'},
  {label: 'د.رشا بن ثعلب', value: 'rasha-bin-thaalab'},
  {label: 'د.أحمد محمد', value: 'ahmed-mohamed'},
  {label: 'د.سارة علي', value: 'sara-ali'},
  {label: 'د.محمد عبد الله', value: 'mohamed-abdullah'},
  {label: 'د.ليلى حسن', value: 'layla-hassan'},
  {label: 'د.علي محمود', value: 'ali-mahmoud'},
  {label: 'د.نور الدين أحمد', value: 'nour-eddine-ahmed'},
  {label: 'د.فاطمة الزهراء', value: 'fatima-az-zahra'}
];
const years = [
  {label: 'الكل', value: 'all'},
  {label: '2023', value: '2023'},
  {label: '2022', value: '2022'},
  {label: '2021', value: '2021'},
  {label: '2020', value: '2020'}
];
const Filters = () => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [lectureFilter, setLectureFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim() === '' || value === 'all') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  function FilterChange(type: 'search' | 'course' | 'lecturer' | 'year', value: string) {
    const queryString = createQueryString(type, value);

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }
  function handleClearFilters() {
    setSearchFilter('');
    setCourseFilter('all');
    setLectureFilter('all');
    setYearFilter('all');
    router.push(pathname);
  }
  const searchDebounced = useDebounce(searchFilter);
  const courseDebounced = useDebounce(courseFilter);
  const lectureDebounced = useDebounce(lectureFilter);
  const yearDebounced = useDebounce(yearFilter);

  useEffect(() => {
    FilterChange('search', searchDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced]);
  useEffect(() => {
    if (courseDebounced === '') {
      FilterChange('course', 'all');
    } else {
      FilterChange('course', courseDebounced);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDebounced]);
  useEffect(() => {
    if (lectureDebounced === '') {
      FilterChange('lecturer', 'all');
    } else FilterChange('lecturer', lectureDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureDebounced]);
  useEffect(() => {
    if (yearDebounced === '') {
      FilterChange('year', 'all');
    } else FilterChange('year', yearDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearDebounced]);

  if (!isMounted) return null;
  return (
    <BrandBox className='max-w-80 px-5 py-4 rounded-2xl space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <h5 className='text-2xl font-bold'>تصفية</h5>
        <Button variant={'link'} className={'text-[#1468AE]'} onClick={handleClearFilters}>
          مسح الكل
        </Button>
      </div>
      {/* Search Filter */}
      <Input label='اسم الملزمة' placeholder='مثلاً: هياكل البيانات' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
      {/* course Filter */}
      <div className='flex flex-col gap-2'>
        <label className='text-base leading-4.75 font-bold text-[#1C2A39]'>المادة</label>
        <div>
          {courses.map(course => {
            return (
              <Button key={course.value} onClick={() => setCourseFilter(course.value)} variant={courseFilter === course.value ? 'website-primary' : 'website-white'} className='mr-2 mb-2 rounded-xl'>
                {course.label}
              </Button>
            );
          })}
        </div>
      </div>
      {/* Lectures */}
      <div className='flex flex-col gap-2'>
        <label className='text-base leading-4.75 font-bold text-[#1C2A39]'>الدكتور</label>
        <div>
          {lectures.map(lecture => {
            return (
              <Button key={lecture.value} onClick={() => setLectureFilter(lecture.value)} variant={lectureFilter === lecture.value ? 'website-primary' : 'website-white'} className='mr-2 mb-2 rounded-xl'>
                {lecture.label}
              </Button>
            );
          })}
        </div>
      </div>
      {/* Date Filter */}
      <div>
        <Select label='السنة' options={years} defaultValue={yearFilter} value={yearFilter} onValueChange={val => setYearFilter(val)} />
      </div>
    </BrandBox>
  );
};

export default Filters;
