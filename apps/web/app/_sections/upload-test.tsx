import BrandBox, {BrandBoxProps} from '@/components/brand-box';
import {Button} from '@repo/ui/components/ui/button';
import {IconCamera, IconCheck, IconEye, IconUpload} from '@tabler/icons-react';
import React from 'react';
interface InfoStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: BrandBoxProps['variant'];
}

const listOfInfoSteps: InfoStep[] = [
  {
    icon: <IconCamera />,
    title: 'ترفع',
    description: 'صور الاختبار أو ملف الملزمة',
    variant: 'light-blue'
  },
  {
    icon: <IconEye />,
    title: 'نراجع',
    description: 'نتأكد إنه واضح وفي القسم الصحيح',
    variant: 'ice-cream'
  },
  {
    icon: <IconCheck />,
    title: 'يُنشر',
    description: 'ويستفيد منه كل طلاب القسم',
    variant: 'light-green'
  }
];
const UploadTestSection = () => {
  return (
    <BrandBox variant='light-green' className='w-full flex items-center gap-5 p-10 mt-20'>
      <div className='flex-1'>
        <h3 className='text-4xl font-bold mb-3'>عندك اختبـــار قديم في جوالك؟</h3>
        <p className='text-lg'>
          صوّره وارفعه بدون تسجيل دخول. يراجعه أدمن أو مندوب الجمعية，
          <br /> وبعدها يوصل لكل طلاب القسم.
        </p>
        <Button variant={'website-primary'} className={'w-40 h-11 rounded-xl mt-3'}>
          <IconUpload />
          ارفع اختباراً أو ملزمة
        </Button>
      </div>
      <div className='flex-1 p-4 flex flex-col gap-3 bg-[#A9E6C7] shadow-inner shadow-[#1C2A3929] rounded-4xl'>
        {listOfInfoSteps.map((item, index) => {
          return (
            <BrandBox key={index} className='flex items-start gap-4 p-4 rounded-3xl'>
              <BrandBox variant={item.variant} className='p-2 rounded-xl'>
                {item.icon}
              </BrandBox>
              <div className=''>
                <h4 className='font-bold leading-5'>{item.title}</h4>
                <p className='text-muted-foreground text-sm'>{item.description}</p>
              </div>
            </BrandBox>
          );
        })}
      </div>
    </BrandBox>
  );
};

export default UploadTestSection;
