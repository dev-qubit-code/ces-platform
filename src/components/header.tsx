import {SidebarTrigger} from './ui/sidebar';
import {Separator} from './ui/separator';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from './ui/breadcrumb';
import React from 'react';
export type TBreadcrumb = {
  title: string;
  url: string;
};
interface HeaderProps {
  breadcrumb: TBreadcrumb[];
}
const Header = ({breadcrumb}: HeaderProps) => {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
      <div className='flex items-center gap-2 px-3'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
