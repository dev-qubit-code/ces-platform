import {RouterProvider} from 'react-router';
import './App.css';
import {QueryClientProvider} from '@tanstack/react-query';
import {Toaster} from 'sonner';
import {queryClient} from './api/instance';
import {getRouters} from './routes';
import {useUser} from './store/user.store';

function App() {
  const user = useUser(state => state.user);
  const role = user?.role || 'manager';
  const routers = getRouters(role);
  return (
    <main dir='rtl'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers} />
        <Toaster dir='rtl' position='top-right' richColors />
      </QueryClientProvider>
    </main>
  );
}

export default App;
/*


*/
