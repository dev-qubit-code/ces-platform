'use client';

import {useEffect, useState} from 'react';
import BrandBox from '@/components/brand-box';

const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const BannerSection = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDate(new Date());
  }, []);

  return (
    <BrandBox variant='light-blue' className='flex h-70 w-full items-center justify-between p-12'>
      <div className='flex-2 space-y-5'>
        <span className='block'>الرئيسية / الأخبار</span>
        <h1 className='mb-6 text-7xl font-bold'>الأخبـــار والفعاليات</h1>
        <p className='w-100 text-xl text-gray-800'>دورات ومؤتمرات ومعارض الجمعية، أول ما تُعلن تلقاها هنا.</p>
      </div>

      <div className='relative me-8 h-full'>
        <div className='size-40 rotate-5 overflow-hidden rounded-3xl'>
          <BrandBox className='flex h-10 w-full items-center justify-center rounded-t-xl rounded-b-none bg-[#E8603C] text-xl font-bold text-white'>{currentDate ? monthNames[currentDate.getMonth()] : '...'}</BrandBox>

          <BrandBox className='flex h-full w-full justify-center rounded-t-none pt-8 text-5xl font-bold'>{currentDate ? dayNames[currentDate.getDay()] : '...'}</BrandBox>
        </div>

        <BrandBox variant='vanilla' className='absolute -bottom-6 -left-10 size-20' />
      </div>
    </BrandBox>
  );
};

export default BannerSection;
