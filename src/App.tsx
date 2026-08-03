import {Outlet} from 'react-router';
import './App.css';
import {AppSidebar} from './components/sidebar/app-sidebar';
import {SidebarInset, SidebarProvider} from './components/ui/sidebar';
import {LayoutProvider} from './context/layout-provider';

function App() {
  return (
    <main dir='rtl'>
      <LayoutProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className=''>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </main>
  );
}

export default App;
