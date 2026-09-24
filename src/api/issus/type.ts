import type {ISSUE_PRIORITY} from '@/enum/issus-priority.enum';
export type TIssuePriority = keyof typeof ISSUE_PRIORITY;
export type TReportResponse = {
  id: string;
  title: string;
  description: string;
  priority: TIssuePriority;
  createdAtUtc: string;
};

export type TCreateReportBody = {
  title: string;
  description: string;
  priority: TIssuePriority;
};

export type TReportsParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export type TReportsResponse = TReportResponse[];
