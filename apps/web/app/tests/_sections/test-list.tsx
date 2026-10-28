'use client';
import {useTests} from '@/api/tests/api';
import Select from '@/components/select';
import TestItem from '../_components/test-item';
import TestsListSkeleton from '../_components/test-list-skelton';
import {AppPagination} from '@/components/app-pagenation';
import {usePagination} from '@/hooks/use-pagination';
import {useState} from 'react';
interface SearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  testType?: string;
  year?: string;
}
interface TestListProps {
  searchParams: SearchParams;
}

const sortOptions = [
  {label: 'الأحدث', value: 'latest'},
  {label: 'الأقدم', value: 'oldest'},
  {label: 'الأكثر مشاهدة', value: 'most-viewed'},
  {label: 'الأقل مشاهدة', value: 'least-viewed'}
];

function TestList({searchParams}: TestListProps) {
  const [page, setPage] = useState(searchParams.page || 1);
  const [pageSize, setPageSize] = useState(searchParams.pageSize || 10);
  const params = searchParams;
  const {data, isLoading} = useTests({page, pageSize, search: params.search?.trim(), Status: params.testType}, {select: response => response.data});
  const tests = data?.items || [];
  const paginationProps = usePagination({
    pagination: data,
    setPage,
    setPageSize
  });
  if (isLoading) {
    return <TestsListSkeleton />;
  }

  return (
    <div className='flex-1 flex items-center flex-col gap-4'>
      <div className='min-h-50 w-full'>
        {/* item number and Sort */}
        <div className='flex items-center justify-between mb-4'>
          <span className='font-bold'>{data?.totalCount} اختبار</span>
          <Select label='الترتيب' options={sortOptions} outerClassName='w-40 gap-x-4 flex-row items-center' />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {tests.map((test, index) => (
            <TestItem key={index} {...test} />
          ))}
        </div>
      </div>
      {/* Pagination */}
      <AppPagination {...paginationProps!} />
    </div>
  );
}

export default TestList;
