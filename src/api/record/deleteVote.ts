import { apiClient } from '../index';
import type { ApiResponse } from '@/types/record';

// 투표 삭제 응답 데이터 타입
export interface DeleteVoteData {
  roomId: number; // 삭제된 투표가 속한 방 ID
}

// API 응답 타입
export type DeleteVoteResponse = ApiResponse<DeleteVoteData>;

// 투표 삭제 API 함수
export const deleteVote = async (roomId: number, voteId: number): Promise<DeleteVoteResponse> => {
  try {
    const response = await apiClient.delete<DeleteVoteResponse>(`/rooms/${roomId}/vote/${voteId}`);
    return response.data;
  } catch (error) {
    console.error('투표 삭제 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:
try {
  const result = await deleteVote(1, 456);
  if (result.isSuccess) {
    console.log("투표 삭제 성공:", result.data.roomId);
    // 성공 처리 로직 (예: 목록에서 제거, 성공 메시지 표시)
  } else {
    console.error("투표 삭제 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/
