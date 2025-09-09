import { apiClient } from '../index';
import type { UpdateVoteRequest, UpdateVoteData, ApiResponse } from '@/types/record';

// API 응답 타입
export type UpdateVoteResponse = ApiResponse<UpdateVoteData>;

// 투표 수정 API 함수
export const updateVote = async (
  roomId: number,
  voteId: number,
  voteData: UpdateVoteRequest,
): Promise<UpdateVoteResponse> => {
  try {
    const response = await apiClient.patch<UpdateVoteResponse>(
      `/rooms/${roomId}/votes/${voteId}`,
      voteData,
    );
    return response.data;
  } catch (error) {
    console.error('투표 수정 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:
const voteData: UpdateVoteRequest = {
  content: "수정된 투표 내용입니다~"
};

try {
  const result = await updateVote(1, 123, voteData);
  if (result.isSuccess) {
    console.log("수정된 방 ID:", result.data.roomId);
    // 성공 처리 로직
  } else {
    console.error("투표 수정 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/