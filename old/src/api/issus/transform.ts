import type {TIssue} from '@/feature/issus/type';

import type {TReportResponse, TCreateReportBody} from './type';
import {ISSUE_PRIORITY} from '@/enum/issus-priority.enum';

export function ReportDtoTransform(data: TReportResponse): TIssue {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    priority: ISSUE_PRIORITY[data.priority],
    createdAt: data.createdAtUtc
  };
}

export function ReportsDtoTransform(data: TReportResponse[]): TIssue[] {
  return data.map(ReportDtoTransform);
}

export function CreateReportDtoTransform(data: TCreateReportBody): TCreateReportBody {
  return {
    title: data.title,
    description: data.description,
    priority: data.priority
  };
}
