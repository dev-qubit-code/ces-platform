import BrandBox from '@/components/brand-box';
import {Button} from '@repo/ui/components/ui/button';
import {IconInfoCircle} from '@tabler/icons-react';

const ReportSections = () => {
  return (
    <BrandBox className='flex items-center justify-between p-5 mt-10 rounded-xl'>
      <div className='flex items-start gap-4'>
        <BrandBox variant='vanilla' className='p-2 rounded-xl'>
          <IconInfoCircle />
        </BrandBox>
        <div>
          <h4 className='text-xl font-bold'>لقيت خطأ في اختبار أو ملف ناقص؟</h4>
          <p className='text-sm'>بلّغ الفريق ويتابعونه من لوحة التحكم.</p>
        </div>
      </div>
      <Button variant='outline' className={'font-bold text-[#1468AE] border-3 border-[#1468AE]'}>
        أرسل بلاغاً
      </Button>
    </BrandBox>
  );
};

export default ReportSections;
