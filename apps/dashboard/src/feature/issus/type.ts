export type TIssuePriority = 'low' | 'medium' | 'high' | 'urgent';
export type TIssue = {
  id: string;

  title: string;

  description: string;

  priority: TIssuePriority;

  createdAt: string;
};