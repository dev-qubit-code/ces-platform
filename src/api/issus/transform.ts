import type {TIssue} from '@/feature/issus/type';
import type {TReportResponse, TCreateReportBody} from './type';

export function ReportDtoTransform(data: TReportResponse): TIssue {
  return {
    id: data.id,
    title: data.title,
    description: data.description,

    // TODO: Backend currently doesn't return these fields
    priority: 'medium',
    createdAt: 'Test Date'
  };
}

export function ReportsDtoTransform(data: TReportResponse[]): TIssue[] {
  return data.map(ReportDtoTransform);
}

export function CreateReportDtoTransform(data: TCreateReportBody): TCreateReportBody {
  return {
    title: data.title,
    description: data.description
    // TODO: Backend doesn't receive a propriety
  };
}
