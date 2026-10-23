import {Suspense} from 'react';
import BannerSection from './_sections/banner';
import Filters from './_sections/filters';
import Select from '@/components/select';
import FileCard, {FileCardProps} from './_components/file-card';
import BrandBox from '@/components/brand-box';
import { Button } from '@repo/ui/components/ui/button';
const sortOptions = [
  {label: 'الأحدث', value: 'latest'},
  {label: 'الأقدم', value: 'oldest'},
  {label: 'الأكثر مشاهدة', value: 'most-viewed'},
  {label: 'الأقل مشاهدة', value: 'least-viewed'}
];

const listOfFiles: FileCardProps[] = [
  {
    title: 'شرائح قواعد البيانات',
    lectureName: 'د.رشا بن ثعلب',
    courseName: 'قواعد البيانات',
    onDownload: () => console.log('Download: قواعد البيانات'),
    onView: () => console.log('View: قواعد البيانات')
  },
  {
    title: 'مقدمة في هياكل البيانات',
    lectureName: 'د.محمد العتيبي',
    courseName: 'هياكل البيانات',
    onDownload: () => console.log('Download: هياكل البيانات'),
    onView: () => console.log('View: هياكل البيانات')
  },
  {
    title: 'أساسيات البرمجة بلغة Java',
    lectureName: 'د.أحمد محمد',
    courseName: 'البرمجة بلغة Java',
    onDownload: () => console.log('Download: Java'),
    onView: () => console.log('View: Java')
  },
  {
    title: 'شبكات الحاسوب',
    lectureName: 'د.خالد أحمد',
    courseName: 'شبكات الحاسوب',
    onDownload: () => console.log('Download: شبكات الحاسوب'),
    onView: () => console.log('View: شبكات الحاسوب')
  },
  {
    title: 'تحليل وتصميم الأنظمة',
    lectureName: 'د.سارة علي',
    courseName: 'تحليل وتصميم الأنظمة',
    onDownload: () => console.log('Download: تحليل الأنظمة'),
    onView: () => console.log('View: تحليل الأنظمة')
  },
  {
    title: 'مبادئ هندسة البرمجيات',
    lectureName: 'د.فاطمة عبدالله',
    courseName: 'مبادئ هندسة البرمجيات',
    onDownload: () => console.log('Download: هندسة البرمجيات'),
    onView: () => console.log('View: هندسة البرمجيات')
  },
  {
    title: 'الذكاء الاصطناعي وتعلم الآلة',
    lectureName: 'د.علي محمد',
    courseName: 'الذكاء الاصطناعي',
    onDownload: () => console.log('Download: الذكاء الاصطناعي'),
    onView: () => console.log('View: الذكاء الاصطناعي')
  },
  {
    title: 'البرمجة الكائنية',
    lectureName: 'د.سلمان العتيبي',
    courseName: 'البرمجة الكائنية',
    onDownload: () => console.log('Download: البرمجة الكائنية'),
    onView: () => console.log('View: البرمجة الكائنية')
  }
];
const page = () => {
  return (
    <div className='custom-container'>
      <BannerSection />
      <div className='flex items-start gap-10 my-10'>
        {/* filters */}
        <Suspense>
          <Filters />
        </Suspense>
        {/* items */}
        <div className='flex-1'>
          {/* item number and Sort */}
          <div className='flex items-center justify-between mb-4'>
            <span className='font-bold'>9 ملزمة</span>
            <Select label='الترتيب' options={sortOptions} outerClassName='w-40 gap-x-4 flex-row items-center' />
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {listOfFiles.map(({onDownload, onView, ...file}, index) => (
              <FileCard key={index} {...file} />
            ))}
          </div>
        </div>
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
