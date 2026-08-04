import type {badgeVariants} from '@/components/ui/badge';
import type {TTestStatus} from '@/feature/panel/type';
import type {VariantProps} from 'class-variance-authority';

export type TestType = 'monthly' | 'midterm' | 'final';
export type TTest = {
  name: string;
  lecturer: string;
  image: string;
  publishedAt: string;
  type: TestType;
  status: TTestStatus;
};

export const TestTypeStatus: Record<
  TestType,
  {
    name: string;
    variant: VariantProps<typeof badgeVariants>['variant'];
  }
> = {
  monthly: {name: 'شهري', variant: 'info-light'},
  midterm: {
    name: 'نصفي',
    variant: 'warning'
  },
  final: {name: 'نهائي', variant: 'default'}
};
export const TestStatus: Record<
  TTestStatus,
  {
    name: string;
    variant: VariantProps<typeof badgeVariants>['variant'];
  }
> = {
  pending: {name: 'موقفة', variant: 'invert-light'},
  approved: {name: 'تم الموافقة عليها', variant: 'success'},
  rejected: {name: 'مرفوقة', variant: 'destructive'}
};
