import {Suspense} from 'react';
import BannerSection from './_sections/banner';
import Filters from './_sections/filters';
import BrandBox from '@/components/brand-box';
import {Button} from '@repo/ui/components/ui/button';
import FileList from './_sections/file-list';

interface PageSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  course?: string;
  lecturer?: string;
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
      <div className='flex items-start gap-10 my-10'>
        {/* filters */}
        <Suspense>
          <Filters />
        </Suspense>
        {/* items */}
        <FileList searchParams={searchParams} />
      </div>
      <BrandBox variant='black' className='p-8 flex items-center justify-between rounded-3xl'>
        <div className='space-y-3'>
          <h3 className='text-4xl font-bold'>عندك ملزمة أو ملخص مفيد؟</h3>
          <p>شاركه مع زملائك. يراجعه فريق الجمعية وينشره باسمك إذا حبيت.</p>
        </div>
        <Button variant={'website-vanilla'}>ارفع ملزمة</Button>
      </BrandBox>
    </div>
  );
};

export default page;
