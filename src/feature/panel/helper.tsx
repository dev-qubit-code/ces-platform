import type {TBreadcrumb} from '@/components/header';

export const PanelBreadcrumb: TBreadcrumb[] = [{title: 'الرئيسية', url: '/'}];

import {Users, ClipboardList, FileText, Clock, GraduationCap, FolderGit2, AlertTriangle} from 'lucide-react';

export const dashboardStats = [
  {
    title: 'إجمالي المستخدمين',
    value: '1,250',
    description: '+12% من الشهر الماضي',
    icon: Users
  },
  {
    title: 'الدكاترة',
    value: '42',
    description: 'أعضاء هيئة التدريس المسجلين',
    icon: GraduationCap
  },
  {
    title: 'الاختبارات',
    value: '85',
    description: 'إجمالي الاختبارات المتاحة',
    icon: ClipboardList
  },
  {
    title: 'الاختبارات المعلقة',
    value: '12',
    description: 'بانتظار المراجعة والاعتماد',
    icon: Clock
  },
  {
    title: 'الملازم والملفات',
    value: '430',
    description: 'ملازم دراسية معتمدة',
    icon: FileText
  },
  {
    title: 'أعمال الطلاب',
    value: '130',
    description: 'مشاريع وملفات مرفوعة',
    icon: FolderGit2
  },
  {
    title: 'المشاكل المبلغ عنها',
    value: '8',
    description: 'تحتاج إلى معالجة وإصلاح',
    icon: AlertTriangle
  }
];
