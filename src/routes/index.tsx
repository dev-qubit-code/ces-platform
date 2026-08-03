import App from '@/App';
import {createBrowserRouter} from 'react-router';

const Routers = createBrowserRouter([
  {
    path: '/',
    Component: () => <App />,
    children: [
      {
        index: true,
        lazy: async () => {
          const {default: Component} = await import('@/feature/panel');
          return {Component};
        }
      },
      {
        path: '/tests',
        children: [
          {
            path: 'all',
            lazy: async () => {
              const {default: Component} = await import('@/feature/tests/all');
              return {Component};
            }
          },
          {
            path: 'pending',
            lazy: async () => {
              const {default: Component} = await import('@/feature/tests/pending');
              return {Component};
            }
          }
        ]
      },
      {
        path: '/courses',
        lazy: async () => {
          const {default: Component} = await import('@/feature/courses');
          return {Component};
        }
      },
      {
        path: '/lecturers',
        lazy: async () => {
          const {default: Component} = await import('@/feature/lecturers');
          return {Component};
        }
      },
      {
        path: '/memoirs',
        lazy: async () => {
          const {default: Component} = await import('@/feature/memoirs');
          return {Component};
        }
      },
      {
        path: '/student-portfolios',
        lazy: async () => {
          const {default: Component} = await import('@/feature/student-portfolios');
          return {Component};
        }
      },
      {
        path: '/users',
        lazy: async () => {
          const {default: Component} = await import('@/feature/users');
          return {Component};
        }
      },
      {
        path: '/about',
        lazy: async () => {
          const {default: Component} = await import('@/feature/about');
          return {Component};
        }
      }
    ]
  }
]);

export default Routers;
