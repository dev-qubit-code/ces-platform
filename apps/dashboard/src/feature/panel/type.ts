export type TTestStatus = 'none' | 'notApproved' | 'pending' | 'approved';
export type TRecentExams = {
  id: number;
  status: TTestStatus;
  examTitle: string;
  timeAgo: string;
};
