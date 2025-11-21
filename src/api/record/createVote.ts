import { apiClient } from '../index';
import type { CreateVoteRequest, CreateVoteData, ApiResponse } from '@/types/record';

export type CreateVoteResponse = ApiResponse<CreateVoteData>;

export const createVote = async (roomId: number, voteData: CreateVoteRequest) => {
  const response = await apiClient.post<CreateVoteResponse>(`/rooms/${roomId}/vote`, voteData);
  return response.data;
};
