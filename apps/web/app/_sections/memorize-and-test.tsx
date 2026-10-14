import BrandBox from '@/components/brand-box';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import DocIcon from '@/public/doc-icon.png';
import PdfIcon from '@/public/pdf-icon.png';
import { IconDownload } from '@tabler/icons-react';

interface Test {
  title: string;
  level: number;
  type: 'final' | 'midterm';
}
interface Memorize {
  title: string;
  level: number;
  url: string;
}
const listOfTests: Test[] = [
  {
    title: 'هياكل البيانات',
    level: 1,
    type: 'final'
  },
  {
    title: 'الدوائر المنطقية',
    level: 2,
    type: 'midterm'
  },
  {
    title: 'نظم التشغيل',
    level: 3,
    type: 'final'
  },
  {
    title: 'شبكات الحاسوب',
    level: 3,
    type: 'final'
  }
];
const listOfMemorize: Memorize[] = [
  {
    title: 'هياكل البيانات',
    level: 1,
    url: '/memorize/data-structures'
  },
  {
    title: 'الدوائر المنطقية',
    level: 2,
    url: '/memorize/logic-circuits'
  },
  {
    title: 'نظم التشغيل',
    level: 3,
    url: '/memorize/operating-systems'
  },
  {
    title: 'شبكات الحاسوب',
    level: 3,
    url: '/memorize/computer-networks'
  }
];

const MemorizeAndTestSection = () => {
  return (
    <section className='mt-15'>
      <h2 className='text-5xl font-bold'>وصـــل حديثاً</h2>
      <p className='text-xl text-text-primary'>آخر ما وافق عليه فريق الجمعية هذا الأسبوع.</p>
      <div className='flex gap-5 mt-5'>
        <BrandBox className='p-4 flex-1'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='text-xl font-bold'>اختبارات</h3>
            <Link href={'/tests'}>
              <Button variant={'link'} className={'text-[#1468AE] font-bold'}>
                كل الاختبارات
              </Button>
            </Link>
          </div>
          <div>
            {listOfTests.map((item, index) => {
              return (
                <BrandBox key={index} variant='list-item' className='mb-2 w-full justify-between flex items-center p-2 rounded-xl'>
                  <div key={index} className='flex items-center gap-3'>
                    <Image src={DocIcon} alt='DocIcon' width={30} height={30} />
                    <span className='font-bold'>{item.title}</span>
                  </div>
                  <div className='flex gap-2 me-2'>
                    <Badge size={'lg'} variant={'success-outline'} className='rounded-lg font-bold text-[#1468AE]'>
                      مستوى {item.level}
                    </Badge>
                    <Badge size={'lg'} variant={'success-outline'} className='rounded-lg font-bold'>
                      {item.type === 'final' ? 'نهائي' : 'نصفي'}
                    </Badge>
                  </div>
                </BrandBox>
              );
            })}
          </div>
        </BrandBox>
        <BrandBox className='p-4 flex-1'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='text-xl font-bold'>ملازم</h3>
            <Link href={'/memorize'}>
              <Button variant={'link'} className={'text-[#1468AE] font-bold'}>
                كل الملازم
              </Button>
            </Link>
          </div>
          <div>
            {listOfMemorize.map((item, index) => {
              return (
                <BrandBox key={index} variant='list-item' className='mb-2 w-full justify-between flex items-center p-2 rounded-xl'>
                  <div key={index} className='flex items-start gap-3'>
                    <Image src={PdfIcon} alt='PdfIcon' width={30} height={30} />
                    <div className='flex flex-col'>
                      <span className='font-bold'>{item.title}</span>
                      <span className='text-sm text-[#4F6072]'> مستوى {item.level}</span>
                    </div>
                  </div>
                  <Button variant={'website-primary'} className={'px-3! rounded-xl'}>
                    <IconDownload />
                  </Button>
                </BrandBox>
              );
            })}
          </div>
        </BrandBox>
      </div>
    </section>
  );
}

export default MemorizeAndTestSection