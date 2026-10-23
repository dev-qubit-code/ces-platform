'use client';
import BrandBox from '@/components/brand-box';
const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const BannerSection = () => {
  return (
    <BrandBox variant='light-blue' className='w-full h-70 flex justify-between items-center p-12'>
      <div className='space-y-5 flex-2'>
        <span className='block'>الرئيسية / الأخبار</span>
        <h1 className='text-7xl mb-6 font-bold'>الأخبـــار والفعاليات</h1>
        <p className='text-xl w-100 text-gray-800'>دورات ومؤتمرات ومعارض الجمعية، أول ما تُعلن تلقاها هنا.</p>
      </div>
      <div className='h-full relative me-8'>
        <div className='rotate-5 size-40 rounded-3xl overflow-hidden'>
          <BrandBox className='bg-[#E8603C] rounded-b-none rounded-t-xl text-white font-bold w-full h-10 flex justify-center items-center text-xl'>{monthNames[new Date().getMonth()]}</BrandBox>
          <BrandBox className='w-full h-full rounded-t-none text-5xl font-bold flex justify-center pt-8'>{dayNames[new Date().getDay()]}</BrandBox>
        </div>
        <BrandBox variant='vanilla' className='size-20 absolute -left-10 -bottom-6'></BrandBox>
      </div>
    </BrandBox>
  );
};

export default BannerSection;
