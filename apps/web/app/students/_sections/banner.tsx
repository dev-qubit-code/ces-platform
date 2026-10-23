import BrandBox from '@/components/brand-box';
import {Button, buttonVariants} from '@repo/ui/components/ui/button';
import Input, {InputClassName} from '@/components/input';
import {cn} from 'cn';
import {IconPlus} from '@tabler/icons-react';
import {VariantProps} from 'class-variance-authority';

const listOfRandomTechnologies = ['React', 'Linux', 'Figma', 'Python', 'Flutter'];
const listOfButtonVariants: VariantProps<typeof buttonVariants>['variant'][] = ['website-white', 'website-ice-cream', 'website-white', 'website-white', 'website-vanilla'];
const BannerSection = () => {
  return (
    <BrandBox variant='purple' className='w-full h-100 flex justify-between items-center p-12'>
      <div className='space-y-5 flex-2'>
        <span className='block'>الرئيسية / دليل الطلاب</span>
        <h1 className='text-7xl mb-6 font-bold'>دليـــل أعمال الطلاب</h1>
        <p className='text-xl w-100 text-gray-800'>مصممين، مطورين، ومهتمين بالشبكات والذكاء الاصطناعي من طلاب القسم. شوف أعمالهم وتواصل معهم مباشرة.</p>
        <div className={cn('max-w-150 flex items-center relative p-2', InputClassName)}>
          <Input unstyled />
          <Button className='w-20'>ابحث</Button>
        </div>
        <Button variant={'ghost'} className={'flex items-center font-bold text-lg hover:bg-transparent'}>
          <IconPlus />
          <span>أضف ملف أعمالك للدليل</span>
        </Button>
      </div>
      <div className='h-full grid grid-cols-3 gap-2 items-center place-content-center relative me-8'>
        {listOfRandomTechnologies.map((technology, index) => (
          <Button key={technology} variant={listOfButtonVariants[index]} className={cn('rounded-xl h-15', index == 3 && 'col-span-2')}>
            {technology}
          </Button>
        ))}
      </div>
    </BrandBox>
  );
};

export default BannerSection;
