import type {UserRole} from '@/enum/user-role.enum';
import AppLayout from '@/layout/app-layout';
import AuthMiddleware from '@/middlewares/auth.middleware';
import PersistUserMiddleware from '@/middlewares/persist-user.middleware';
import {createBrowserRouter} from 'react-router';
export function getRouters(role: UserRole) {
  return createBrowserRouter([
    {
      path: '/',
      Component: () => <AuthMiddleware />,
      children: [
        {
          Component: () => <AppLayout />,
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
            ...(role == 'admin'
              ? [
                  {
                    path: '/users',
                    lazy: async () => {
                      const {default: Component} = await import('@/feature/users');
                      return {Component};
                    }
                  }
                ]
              : [{}]),
            {
              path: '/issus',
              lazy: async () => {
                const {default: Component} = await import('@/feature/issus');
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
      ]
    },
    {
      Component: () => <PersistUserMiddleware />,
      children: [
        {
          path: '/login',
          lazy: async () => {
            const {default: Component} = await import('@/feature/auth/login');
            return {Component};
          }
        }
      ]
    }
  ]);
}
