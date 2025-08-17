import { apiClient } from '../index';
import type { CreateVoteRequest, CreateVoteData, ApiResponse } from '@/types/record';

// API 응답 타입
export type CreateVoteResponse = ApiResponse<CreateVoteData>;

// 투표 생성 API 함수
export const createVote = async (roomId: number, voteData: CreateVoteRequest) => {
  const response = await apiClient.post<CreateVoteResponse>(`/rooms/${roomId}/vote`, voteData);
  return response.data;
};

/*
사용 예시:
const voteData: CreateVoteRequest = {
  page: 20,
  isOverview: true,
  content: "맘은 최고의 새버린다. 셰익스피어의?",
  voteItemList: [
    { itemName: "네" },
    { itemName: "아니오" }
  ]
};

try {
  const result = await createVote(1, voteData);
  if (result.isSuccess) {
    console.log("생성된 투표 ID:", result.data.voteId);
    console.log("방 ID:", result.data.roomId);
    // 성공 처리 로직
  } else {
    console.error("투표 생성 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/
