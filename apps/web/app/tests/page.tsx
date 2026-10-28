import BannerSection from './_sections/banner';
import Filters from './_sections/filters';
import {Suspense} from 'react';
import TestList from './_sections/test-list';
interface PageSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  testType?: string;
  year?: string;
}
interface PageProps {
  searchParams: Promise<PageSearchParams>;
}
const page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  return (
    <div className='custom-container'>
      <BannerSection />
      <div className='flex items-start gap-10 mt-10'>
        {/* filters */}
        <Suspense>
          <Filters />
        </Suspense>
        {/* items */}
        <TestList searchParams={searchParams} />
      </div>
    </div>
  );
};

export default page;
