'use client';
import BrandBox from '@/components/brand-box';
const BannerSection = () => {
  return (
    <BrandBox className='w-full h-80 flex justify-between items-center p-12'>
      <div className='space-y-5 flex-2'>
        <span className='block'>الرئيسية / البلاغات والملاحظات</span>
        <h1 className='text-7xl mb-6 font-bold'>بلّغـــنا ونتابعها معك</h1>
        <p className='text-xl w-100 text-gray-400'>خطأ في اختبار، ملف ناقص، معلومة غلط، أو مشكلة في المنصة نفسها؟ يوصل بلاغك مباشرة لأدمن ومندوبي الجمعية.</p>
      </div>
      <div className='flex gap-4 relative me-5'>
        <BrandBox variant='light-blue' className='rounded-3xl size-20 text-3xl text-black flex justify-center items-center font-bold relative bottom-2.5 rotate-10'>
          S
        </BrandBox>
        <BrandBox className='rounded-3xl size-20 text-3xl text-black flex justify-center items-center font-bold'>E</BrandBox>
        <BrandBox variant='light-blue' className='rounded-3xl size-20 text-3xl text-black flex justify-center items-center font-bold relative bottom-2.5 -rotate-10'>
          C
        </BrandBox>
      </div>
    </BrandBox>
  );
};

export default BannerSection;
