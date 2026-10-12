import type {TBreadcrumb} from '@/components/header';
import type {badgeVariants} from '@/components/ui/badge';
import type {VariantProps} from 'class-variance-authority';

export const PanelBreadcrumb: TBreadcrumb[] = [{title: 'الرئيسية', url: '/'}];

import {Users, ClipboardList, FileText, Clock, GraduationCap, FolderGit2, AlertTriangle} from 'lucide-react';
import type {TRecentExams, TTestStatus} from './type';

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

export const recentExamsData: TRecentExams[] = [
  {
    id: 1,
    status: 'pending',
    examTitle: 'هندسة برمجيات - الميدتيرم 2023',
    timeAgo: 'قبل ساعتين'
  },
  {
    id: 2,
    status: 'pending',
    examTitle: 'تراكيب بيانات - النهائي 2022',
    timeAgo: 'قبل 5 ساعات'
  },
  {
    id: 3,
    status: 'pending',
    examTitle: 'شبكات حاسوب - كويز 1',
    timeAgo: 'أمس'
  },
  {
    id: 4,
    status: 'pending',
    examTitle: 'ذكاء اصطناعي - عملي',
    timeAgo: 'أمس'
  },
  {
    id: 5,
    status: 'pending',
    examTitle: 'قواعد بيانات 2 - نصفي',
    timeAgo: 'قبل يومين'
  }
];

export const resentStatus: Record<TTestStatus, VariantProps<typeof badgeVariants>['variant']> = {
  pending: 'invert-light',
  approved: 'success',
  rejected: 'destructive'
};
