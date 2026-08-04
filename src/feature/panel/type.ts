export type TTestStatus = 'pending' | 'approved' | 'rejected';
export type TRecentExams = {
  id: number;
  status: TTestStatus;
  examTitle: string;
  timeAgo: string;
};
