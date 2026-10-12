import {AppDialog} from '@/components/app-dialog';
import {AppSheet} from '@/components/app-sheet';
import Header from '@/components/header';
import {AppSidebar} from '@/components/sidebar/app-sidebar';
import {SidebarProvider, SidebarInset} from '@/components/ui/sidebar';
import {LayoutProvider} from '@/context/layout-provider';
import {useHeader} from '@/store/header-store';
import {Outlet} from 'react-router';

const AppLayout = () => {
  const breadcrumb = useHeader(state => state.breadcrumb);
  return (
    <div>
      <LayoutProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className='relative'>
            <Header breadcrumb={breadcrumb} />
            <div className='container mx-auto p-4 mb-10'>
              <Outlet />
            </div>
            <AppSheet />
            <AppDialog />
            <footer className='absolute bottom-0 w-full border-t py-2 text-center text-sm text-muted-foreground'>جميع الحقوق محفوظة © {new Date().getFullYear()} جمعية الحاسوب</footer>
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </div>
  );
};

export default AppLayout;
