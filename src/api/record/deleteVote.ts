import { apiClient } from '../index';
import type { ApiResponse } from '@/types/record';

export interface DeleteVoteData {
  roomId: number;
}

export type DeleteVoteResponse = ApiResponse<DeleteVoteData>;

export const deleteVote = async (roomId: number, voteId: number): Promise<DeleteVoteResponse> => {
  try {
    const response = await apiClient.delete<DeleteVoteResponse>(`/rooms/${roomId}/vote/${voteId}`);
    return response.data;
  } catch (error) {
    console.error('투표 삭제 API 오류:', error);
    throw error;
  }
};
