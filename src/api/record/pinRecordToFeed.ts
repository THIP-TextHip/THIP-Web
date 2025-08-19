import { apiClient } from '../index';
import type { ApiResponse } from '@/types/record';

// 피드 핀 응답 데이터 타입
export interface PinRecordData {
  bookTitle: string;
  authorName: string;
  bookImageUrl: string;
  isbn: string;
}

// API 응답 타입
export type PinRecordResponse = ApiResponse<PinRecordData>;

// 기록을 피드에 핀하기 API 함수
export const pinRecordToFeed = async (roomId: number, recordId: number) => {
  const response = await apiClient.get<PinRecordResponse>(
    `/rooms/${roomId}/records/${recordId}/pin`
  );
  return response.data;
};

/*
사용 예시:
try {
  const result = await pinRecordToFeed(1, 123);
  if (result.isSuccess) {
    console.log("책 제목:", result.data.bookTitle);
    console.log("저자명:", result.data.authorName);
    console.log("책 이미지:", result.data.bookImageUrl);
    console.log("ISBN:", result.data.isbn);
    // 성공 처리 로직 - 피드 작성 화면으로 이동
  } else {
    console.error("핀하기 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/