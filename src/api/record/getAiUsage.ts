import { apiClient } from '../index';
import type { AiUsageData, ApiResponse } from '@/types/record';

// API 응답 타입
export type GetAiUsageResponse = ApiResponse<AiUsageData>;

// AI 이용 횟수 조회 API 함수
export const getAiUsage = async (roomId: number) => {
  const response = await apiClient.get<GetAiUsageResponse>(
    `/rooms/${roomId}/users/ai-usage`,
  );
  return response.data;
};

/*
사용 예시:
try {
  const result = await getAiUsage(1);
  if (result.isSuccess) {
    console.log("AI 독서감상문 작성 가능 횟수:", result.data.recordReviewCount);
    console.log("기록 작성 횟수:", result.data.recordCount);
    // 성공 처리 로직
  } else {
    console.error("AI 이용 횟수 조회 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/
