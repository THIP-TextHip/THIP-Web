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

// 공통 API 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}
