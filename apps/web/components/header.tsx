'use client';
import BrandBox from './brand-box';
import Link from 'next/link';
import Image from 'next/image';
import CESLogo from '@/public/ces-logo.png';
import {Button} from '@repo/ui/components/ui/button';
import {usePathname} from 'next/navigation';
import {IconUpload} from '@tabler/icons-react';
import {cn} from 'cn';
const Header = () => {
  const path = usePathname();
  return (
    <header className='custom-container'>
      <BrandBox className='min-h-15 w-full flex justify-between items-center p-3'>
        <a href='#' className='flex gap-2 items-center'>
          <Image src={CESLogo} width={40} height={40} alt='ces-logo' />
          <h5 className='text-lg font-semibold'>جمعية هندسة الحاسوب</h5>
        </a>
        <ul className='flex gap-2 items-center'>
          <HeaderItem href='/' title='الرئيسية' path={path} />
          <HeaderItem href='/tests' title='الاختبارات' path={path} />
          <HeaderItem href='/memoirs' title='الملازم' path={path} />
          <HeaderItem href='/students' title='دليل الطلاب' path={path} />
          <HeaderItem href='/news' title='الأخبار' path={path} />
          <HeaderItem href='/about' title='عن الجمعية' path={path} />
          <HeaderItem href='/report' title='بلاغ' path={path} />
        </ul>
        <Button variant={'website-primary'}>
          <IconUpload />
          ارفع محتوى
        </Button>
      </BrandBox>
    </header>
  );
};

export default Header;

function HeaderItem({title, href, path}: {title: string; href: string; path: string}) {
  const isActive = path === href;
  return (
    <Link href={href}>
      <Button variant='ghost' className={cn(isActive && 'bg-[#E4EFF8] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.85098),inset_4px_5px_10px_rgba(28,42,57,0.160784)] rounded-[16px] text-text-primary font-bold')}>
        {title}
      </Button>
    </Link>
  );
}
