// 투표 아이템 타입
export interface VoteItem {
  voteItemId: number;
  itemName: string;
  percentage: number;
  isVoted: boolean;
}

// 기록/투표 포스트 타입
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
  isLocked: boolean; // 블러 처리 여부
  voteItems: VoteItem[];
}

// 기록장 조회 요청 파라미터 타입
export interface GetMemoryPostsParams {
  roomId: number;
  type?: 'group' | 'mine'; // default: group
  sort?: 'latest' | 'like' | 'comment'; // default: latest (type이 group인 경우만)
  pageStart?: number | null; // 페이지 필터 시작 (default: null)
  pageEnd?: number | null; // 페이지 필터 끝 (default: null)
  isOverview?: boolean; // 총평 보기 필터 (default: false)
  isPageFilter?: boolean; // 페이지 보기 필터 (default: false)
  cursor?: string | null; // 페이지네이션 커서
}

// 기록장 조회 응답 데이터 타입
export interface MemoryPostsData {
  postList: Post[];
  roomId: number;
  isOverviewEnabled: boolean;
  isbn: string;
  nextCursor: string | null;
  isLast: boolean;
}

// API 응답 타입
export interface GetMemoryPostsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MemoryPostsData;
}

// Memory 페이지에서 사용하는 Record 타입 (좋아요 상태 포함)
export interface Record {
  id: string;
  user: string;
  userPoints: number;
  content: string;
  likeCount: number;
  commentCount: number;
  timeAgo: string;
  createdAt: Date;
  type: 'text' | 'poll';
  recordType: 'page' | 'overall';
  pageRange?: string;
  isWriter: boolean;
  isLiked: boolean; // 좋아요 상태 추가
  pollOptions?: PollOption[];
}

// 투표 옵션 타입
export interface PollOption {
  id: string;
  text: string;
  percentage: number;
  isHighest: boolean;
}
