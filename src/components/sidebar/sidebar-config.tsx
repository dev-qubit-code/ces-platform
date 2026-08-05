import {LayoutDashboard, Bug, ListTodo, Package, Users, MessagesSquare, ShieldCheck, Command, InfoIcon, Users2} from 'lucide-react';
import type {SidebarData} from './type';

export const sidebarData: SidebarData = {
  teams: [
    {
      name: 'CES PLATFORM',
      // Add your own logo here
      logo: Command,
      plan: 'جمعية هندسة الحاسوب'
    }
  ],
  navGroups: [
    {
      title: 'العام',
      items: [
        {
          title: 'الرئيسية',
          url: '/',
          icon: LayoutDashboard
        },
        {
          title: 'اختبارات',
          icon: ListTodo,
          items: [
            {
              title: 'كل الاختبارات',
              url: '/tests/all'
            },
            {
              title: 'الاختبارات المعلقة',
              url: '/tests/pending'
            }
          ]
        },
        {
          title: 'المادة',
          url: '/courses',
          icon: Package
        },
        {
          title: 'الدكتور',
          url: '/lecturers',
          icon: MessagesSquare
        },
        {
          title: 'ملزمة',
          url: '/memoirs',
          icon: Users
        }
      ]
    },
    {
      title: 'اخرى',
      items: [
        {
          title: 'ملفات اعمال الطلاب',
          icon: ShieldCheck,
          url: '/student-portfolios'
        },
        {
          title: 'المستخدمين',
          icon: Users2,
          url: '/users'
        },
        {
          title: 'الشكاوي',
          icon: Bug,
          url: '/issuss'
        },
        {
          title: 'نبدة المطورين',
          badge: 'v1.0.0',
          url: '/about',
          icon: InfoIcon
        }
      ]
    }
  ]
};
