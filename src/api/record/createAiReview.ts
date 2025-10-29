import { apiClient } from '../index';
import type { CreateAiReviewData, ApiResponse } from '@/types/record';

// API 응답 타입
export type CreateAiReviewResponse = ApiResponse<CreateAiReviewData>;

// AI 독서감상문 생성 API 함수
export const createAiReview = async (roomId: number) => {
  const response = await apiClient.post<CreateAiReviewResponse>(
    `/rooms/${roomId}/record/ai-review`,
  );
  return response.data;
};

/*
사용 예시:
try {
  const result = await createAiReview(1);
  if (result.isSuccess) {
    console.log("생성된 독서감상문:", result.data.content);
    console.log("잔여 이용 횟수:", result.data.count);
    // 성공 처리 로직
  } else {
    console.error("AI 독서감상문 생성 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/
