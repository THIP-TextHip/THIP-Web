export interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  timeAgo: string;
  createdAt: Date;
  profileImageUrl?: string;
  isWriter?: boolean;
}

// 오늘의 한마디 관련 타입들
export interface TodayCommentItem {
  attendanceCheckId: number;
  creatorId: number;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  todayComment: string;
  postDate: string;
  date: string;
  isWriter: boolean;
}

export interface DailyGreetingData {
  todayCommentList: TodayCommentItem[];
  nextCursor: string;
  isLast: boolean;
}
