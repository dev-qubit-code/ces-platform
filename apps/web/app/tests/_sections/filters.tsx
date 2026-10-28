'use client';
import BrandBox from '@/components/brand-box';
import Input from '@/components/input';
import Select from '@/components/select';
import {Button} from '@repo/ui/components/ui/button';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import {useDebounce} from '@repo/ui/hooks/use-debounce';

const testTypes = [
  {label: 'الكل', value: 'all'},
  {label: 'شهري', value: 'monthly'},
  {label: 'نصفي', value: 'midterm'},
  {label: 'نهائي', value: 'final'}
];
const years = [
  {label: 'الكل', value: 'all'},
  {label: '2023', value: '2023'},
  {label: '2022', value: '2022'},
  {label: '2021', value: '2021'},
  {label: '2020', value: '2020'}
];
const Filters = () => {
  const searchParams = useSearchParams();
  const [searchFilter, setSearchFilter] = useState<string>(searchParams.get('search') || '');
  const [testFilter, setTestFilter] = useState(searchParams.get('testType') || 'all');
  const [yearFilter, setYearFilter] = useState(searchParams.get('year') || 'all');
  const [isMounted, setIsMounted] = useState(false);
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

  function FilterChange(type: 'search' | 'level' | 'testType' | 'year', value: string) {
    const queryString = createQueryString(type, value);

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }
  function handleClearFilters() {
    setSearchFilter('');
    setTestFilter('all');
    setYearFilter('all');
    router.push(pathname);
  }
  const searchDebounced = useDebounce(searchFilter);
  const testDebounced = useDebounce(testFilter);
  const yearDebounced = useDebounce(yearFilter);

  useEffect(() => {
    FilterChange('search', searchDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced]);
  useEffect(() => {
    if (testDebounced === '') {
      FilterChange('testType', 'all');
    } else FilterChange('testType', testDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testDebounced]);
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
      <Input label='اسم المادة' placeholder='مثلاً: هياكل البيانات' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
      {/* Level test type */}
      <div className='flex flex-col gap-2'>
        <label className='text-base leading-4.75 font-bold text-[#1C2A39]'>نوع الاختبار</label>
        <div>
          {testTypes.map(testType => {
            return (
              <Button key={testType.value} onClick={() => setTestFilter(testType.value)} variant={testFilter === testType.value ? 'website-primary' : 'website-white'} className='mr-2 mb-2 rounded-xl'>
                {testType.label}
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
