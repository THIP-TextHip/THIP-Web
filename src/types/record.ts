// 기록 생성 요청 데이터 타입
export interface CreateRecordRequest {
  page: number; // 페이지 번호
  isOverview: boolean; // 총평 여부
  content: string; // 기록 내용
}

// 기록 생성 응답 데이터 타입
export interface CreateRecordData {
  recordId: number; // 생성된 기록 ID
  roomId: number; // 방 ID
}

// 투표 아이템 타입
export interface VoteItem {
  itemName: string; // 투표 옵션 이름
}

// 투표 생성 요청 데이터 타입
export interface CreateVoteRequest {
  page: number; // 페이지 번호
  isOverview: boolean; // 총평 여부
  content: string; // 투표 내용
  voteItemList: VoteItem[]; // 투표 옵션 리스트
}

// 투표 생성 응답 데이터 타입
export interface CreateVoteData {
  voteId: number; // 생성된 투표 ID
  roomId: number; // 방 ID
}

// 투표 아이템 응답 타입 (투표 결과 포함)
export interface VoteItemResult {
  voteItemId: number; // 투표 아이템 ID
  itemName: string; // 투표 옵션 이름
  percentage: number; // 득표율
  count: number; // 득표수
  isVoted: boolean; // 현재 사용자가 투표했는지 여부
}

// 투표하기 요청 데이터 타입
export interface VoteRequest {
  voteItemId: number; // 투표할 아이템 ID
  type: boolean; // true: 투표하기, false: 투표취소
}

// 투표하기 응답 데이터 타입
export interface VoteData {
  postId: number; // 포스트 ID
  roomId: number; // 방 ID
  voteItems: VoteItemResult[]; // 투표 결과 리스트
}

// 기록 수정 요청 데이터 타입
export interface UpdateRecordRequest {
  content: string; // 수정할 기록 내용
}

// 기록 수정 응답 데이터 타입
export interface UpdateRecordData {
  roomId: number; // 방 ID
}

// 투표 수정 요청 데이터 타입
export interface UpdateVoteRequest {
  content: string; // 수정할 투표 내용
}

// 투표 수정 응답 데이터 타입
export interface UpdateVoteData {
  roomId: number; // 방 ID
}

// AI 독서감상문 생성 응답 데이터 타입
export interface CreateAiReviewData {
  content: string; // 생성된 독서감상문 내용
  count: number; // 잔여 이용 횟수
}

// AI 이용 횟수 조회 응답 데이터 타입
export interface AiUsageData {
  recordReviewCount: number; // AI 독서감상문 작성 가능 횟수
  recordCount: number; // 기록 작성 횟수
}

// 공통 API 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}
