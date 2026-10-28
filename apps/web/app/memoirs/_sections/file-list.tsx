'use client';
import Select from '@/components/select';
import FileCard from '../_components/file-card';
import {useNotes} from '@/api/notes/api';
import FilesListSkeleton from '../_components/file-list-skelton';
import {usePagination} from '@/hooks/use-pagination';
import {useState} from 'react';
import {AppPagination} from '@/components/app-pagenation';

interface PageSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  course?: string;
  lecturer?: string;
  year?: string;
}
const sortOptions = [
  {label: 'الأحدث', value: 'latest'},
  {label: 'الأقدم', value: 'oldest'},
  {label: 'الأكثر مشاهدة', value: 'most-viewed'},
  {label: 'الأقل مشاهدة', value: 'least-viewed'}
];

function FileList({searchParams}: {searchParams: PageSearchParams}) {
  const [page, setPage] = useState(searchParams.page || 1);
  const [pageSize, setPageSize] = useState(searchParams.pageSize || 10);
  // TODO Add Course and Lecturer filters to the API call when the backend supports it
  const {data, isLoading} = useNotes({page, pageSize, search: searchParams.search || ''}, {select: data => data.data});
  const listOfFiles = data?.items || [];
  const pagination = usePagination({
    pagination: data,
    setPage,
    setPageSize
  });
  if (isLoading) return <FilesListSkeleton />;

  return (
    <div className='flex-1 flex items-center flex-col gap-4'>
      <div className='min-h-50 w-full'>
        {/* item number and Sort */}
        <div className='flex items-center justify-between mb-4'>
          <span className='font-bold'>{data?.totalCount} ملزمة</span>
          <Select label='الترتيب' options={sortOptions} outerClassName='w-40 gap-x-4 flex-row items-center' />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {listOfFiles.map((file, index) => (
            <FileCard key={index} memory={file} />
          ))}
        </div>
      </div>
      {/* Pagination */}
      <AppPagination {...pagination!} />
    </div>
  );
}

export default FileList;
