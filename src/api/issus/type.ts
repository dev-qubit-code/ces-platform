import type {TPaginationResponse} from '../type';

/* Backend */

export type TReportResponse = {
  id: string;
  title: string;
  description: string;
};

export type TCreateReportBody = {
  title: string;
  description: string;
};

export type TReportsParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export type TReportsResponse = TPaginationResponse<TReportResponse>;
