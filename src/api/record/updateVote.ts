import { apiClient } from '../index';
import type { UpdateVoteRequest, UpdateVoteData, ApiResponse } from '@/types/record';

export type UpdateVoteResponse = ApiResponse<UpdateVoteData>;

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
