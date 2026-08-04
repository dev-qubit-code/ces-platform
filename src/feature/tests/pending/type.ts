import type {badgeVariants} from '@/components/ui/badge';
import type {VariantProps} from 'class-variance-authority';
import type {TestType} from '../all/type';

export type TTest = {
  name: string;
  lecturer: string;
  image: string;
  publishedAt: string;
  type: TestType;
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
