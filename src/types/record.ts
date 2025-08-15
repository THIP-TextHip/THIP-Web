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

// 공통 API 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}
