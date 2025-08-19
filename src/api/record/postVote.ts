import { apiClient } from '../index';
import type { VoteRequest, VoteData, ApiResponse } from '@/types/record';

// API 응답 타입
export type VoteResponse = ApiResponse<VoteData>;

// 투표하기 API 함수
export const postVote = async (roomId: number, voteId: number, voteData: VoteRequest) => {
  const response = await apiClient.post<VoteResponse>(`/rooms/${roomId}/vote/${voteId}`, voteData);
  return response.data;
};

/*
사용 예시:
const voteData: VoteRequest = {
  voteItemId: 1,
  type: true // true: 투표하기, false: 투표취소
};

try {
  const result = await postVote(1, 1, voteData);
  if (result.isSuccess) {
    console.log("투표 성공:", result.data);
    console.log("포스트 ID:", result.data.postId);
    console.log("방 ID:", result.data.roomId);
    console.log("투표 결과:", result.data.voteItems);
    // 성공 처리 로직
  } else {
    console.error("투표 실패:", result.message);
    // 실패 처리 로직 (에러 코드별 분기 처리 가능)
    // 120001: 이미 투표한 투표항목입니다.
    // 120002: 투표하지 않은 투표항목은 취소할 수 없습니다.
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/