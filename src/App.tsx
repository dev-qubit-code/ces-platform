import {Outlet} from 'react-router';
import './App.css';
import {AppSidebar} from './components/sidebar/app-sidebar';
import {SidebarInset, SidebarProvider} from './components/ui/sidebar';
import {LayoutProvider} from './context/layout-provider';
import Header from './components/header';
import {useHeader} from './store/header-store';

function App() {
  const breadcrumb = useHeader(state => state.breadcrumb);
  return (
    <main dir='rtl'>
      <LayoutProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className=''>
            <Header breadcrumb={breadcrumb} />
            <div className='container mx-auto p-4'>
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </main>
  );
}

export default App;
