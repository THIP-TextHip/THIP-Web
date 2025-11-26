import { apiClient } from '../index';
import type { VoteRequest, VoteData, ApiResponse } from '@/types/record';

export type VoteResponse = ApiResponse<VoteData>;

export const postVote = async (roomId: number, voteId: number, voteData: VoteRequest) => {
  try {
    const response = await apiClient.post<VoteResponse>(
      `/rooms/${roomId}/vote/${voteId}`,
      voteData,
    );
    return response.data;
  } catch (error: any) {
    console.error('투표 API 오류:', error);
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};
