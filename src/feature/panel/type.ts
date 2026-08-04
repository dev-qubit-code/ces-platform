export type TResentStatus = 'pending' | 'approved' | 'rejected';
export type TRecentExams = {
  id: number;
  status: TResentStatus;
  examTitle: string;
  timeAgo: string;
};
