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
  const path = usePathname() || '/';

  return (
    <header className='custom-container'>
      <BrandBox className='flex min-h-15 w-full items-center justify-between p-3 shadow-sm transition-all duration-300 hover:shadow-md'>
        <Link href='/' className='flex items-center gap-2 group'>
          <div className='overflow-hidden rounded-full'>
            <Image src={CESLogo} width={40} height={40} alt='ces-logo' className='transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3' />
          </div>
          <h5 className='text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary'>جمعية هندسة الحاسوب</h5>
        </Link>

        <nav aria-label='التنقل الرئيسي' className='hidden md:block'>
          <ul className='flex items-center gap-1.5'>
            <HeaderItem href='/' title='الرئيسية' path={path} />
            <HeaderItem href='/tests' title='الاختبارات' path={path} />
            <HeaderItem href='/memoirs' title='الملازم' path={path} />
            <HeaderItem href='/students' title='دليل الطلاب' path={path} />
            <HeaderItem href='/news' title='الأخبار' path={path} />
            <HeaderItem href='/about' title='عن الجمعية' path={path} />
            <HeaderItem href='/report' title='بلاغ' path={path} />
          </ul>
        </nav>

        <Link href='/upload' className='shrink-0'>
          <Button variant='website-primary' className='gap-2 group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'>
            <IconUpload size={20} className='transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110' />
            ارفع محتوى
          </Button>
        </Link>
      </BrandBox>
    </header>
  );
};

export default Header;

function HeaderItem({title, href, path}: {title: string; href: string; path: string}) {
  const isActive = href === '/' ? path === '/' : path.startsWith(href);

  return (
    <li className='list-none'>
      <Link href={href} tabIndex={-1}>
        <Button
          variant='ghost'
          className={cn(
            'transition-all duration-300 ease-in-out hover:bg-[#E4EFF8]/60 hover:scale-[1.02]', // تأثير التمرير
            isActive ? 'bg-[#E4EFF8] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.85098),inset_4px_5px_10px_rgba(28,42,57,0.160784)] rounded-[16px] text-text-primary font-bold' : 'text-text-primary/70 font-medium'
          )}
        >
          {title}
        </Button>
      </Link>
    </li>
  );
}
