import BannerSection from './_sections/banner';
import Select from '@/components/select';
import Filters from './_sections/filters';
import {Suspense} from 'react';
import TestItem, {TestItemProps} from './_components/test-item';
const sortOptions = [
  {label: 'الأحدث', value: 'latest'},
  {label: 'الأقدم', value: 'oldest'},
  {label: 'الأكثر مشاهدة', value: 'most-viewed'},
  {label: 'الأقل مشاهدة', value: 'least-viewed'}
];

const listOfTests: TestItemProps[] = [
  {
    title: 'هياكل البيانات',
    level: 2,
    type: 'الفصل الأول',
    date: '2023-08-15'
  },
  {
    title: 'الدوائر المنطقية',
    level: 1,
    type: 'الفصل الثاني',
    date: '2023-08-20'
  },
  {
    title: 'البرمجة بلغة C',
    level: 3,
    type: 'الفصل الثاني',
    date: '2023-08-25'
  },
  {
    title: 'البرمجة بلغة C++',
    level: 2,
    type: 'الفصل الاول',
    date: '2023-09-01'
  },
  {
    title: 'المعالجات الدقيقة',
    level: 1,
    type: 'الفصل الثاني',
    date: '2023-09-05'
  },
  {
    title: 'الذكاء الاصطناعي',
    level: 3,
    type: 'الفصل الاول',
    date: '2023-09-10'
  },
  {
    title: 'البرمجة الكائنية',
    level: 2,
    type: 'الفصل الثالث',
    date: '2023-09-15'
  },
  {
    title: 'شبكات الحاسوب',
    level: 1,
    type: 'الفصل الثاني',
    date: '2023-09-20'
  },
  {
    title: 'معمارية الحاسوب',
    level: 3,
    type: 'الفصل الاول',
    date: '2023-09-25'
  },
  {
    title: 'قواعد البيانات',
    level: 2,
    type: 'الفصل الثالث',
    date: '2023-10-01'
  },
  {
    title: 'الرياضيات المتقطعة',
    level: 1,
    type: 'الفصل الثاني',
    date: '2023-10-05'
  }
];

const page = () => {
  return (
    <div className='custom-container'>
      <BannerSection />
      <div className='flex items-start gap-10 mt-10'>
        {/* filters */}
        <Suspense>
          <Filters />
        </Suspense>
        {/* items */}
        <div className='flex-1'>
          {/* item number and Sort */}
          <div className='flex items-center justify-between mb-4'>
            <span className='font-bold'>9 اختبار</span>
            <Select label='الترتيب' options={sortOptions} outerClassName='w-40 gap-x-4 flex-row items-center' />
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {listOfTests.map((test, index) => (
              <TestItem key={index} {...test} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
