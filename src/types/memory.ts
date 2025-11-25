export interface VoteItem {
  voteItemId: number;
  itemName: string;
  percentage: number;
  count: number;
  isVoted: boolean;
}

export interface Post {
  postId: number;
  postDate: string;
  postType: 'RECORD' | 'VOTE';
  page: number;
  userId: number;
  nickName: string;
  profileImageUrl: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isOverview: boolean;
  isLiked: boolean;
  isWriter: boolean;
  isLocked: boolean;
  voteItems: VoteItem[];
}

export interface GetMemoryPostsParams {
  roomId: number;
  type?: 'group' | 'mine';
  sort?: 'latest' | 'like' | 'comment';
  pageStart?: number | null;
  pageEnd?: number | null;
  isOverview?: boolean;
  isPageFilter?: boolean;
  cursor?: string | null;
}

export interface MemoryPostsData {
  postList: Post[];
  roomId: number;
  isOverviewEnabled: boolean;
  isbn: string;
  nextCursor: string | null;
  isLast: boolean;
  totalPages?: number;
  currentUserPage?: number;
}

export interface GetMemoryPostsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MemoryPostsData;
}

export interface Record {
  id: string;
  user: string;
  userPoints: number;
  profileImageUrl: string;
  content: string;
  likeCount: number;
  commentCount: number;
  timeAgo: string;
  createdAt: Date;
  type: 'text' | 'poll';
  recordType: 'page' | 'overall';
  pageRange?: string;
  isWriter: boolean;
  isLiked: boolean;
  isLocked: boolean;
  pollOptions?: PollOption[];
}

export interface PollOption {
  id: string;
  text: string;
  percentage: number;
  count: number;
  isHighest: boolean;
  voteItemId: number;
  isVoted: boolean;
}
