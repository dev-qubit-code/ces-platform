import {Outlet} from 'react-router';
import './App.css';
import {AppSidebar} from './components/sidebar/app-sidebar';
import {SidebarInset, SidebarProvider} from './components/ui/sidebar';
import {LayoutProvider} from './context/layout-provider';
import Header from './components/header';
import {useHeader} from './store/header-store';
import {AppSheet} from './components/app-sheet';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './api/instance';
import {AppDialog} from './components/app-dialog';
import {Toaster} from 'sonner';

function App() {
  const breadcrumb = useHeader(state => state.breadcrumb);
  return (
    <main dir='rtl'>
      <LayoutProvider>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='relative'>
              <Header breadcrumb={breadcrumb} />
              <div className='container mx-auto p-4'>
                <Outlet />
              </div>
              <AppSheet />
              <AppDialog />
              <Toaster dir='rtl' position='top-right' richColors />
              <footer className='absolute bottom-0 w-full border-t py-2 text-center text-sm text-muted-foreground'>جميع الحقوق محفوظة © {new Date().getFullYear()} جمعية الحاسوب</footer>
            </SidebarInset>
          </SidebarProvider>
        </QueryClientProvider>
      </LayoutProvider>
    </main>
  );
}

export default App;
