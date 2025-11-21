import { apiClient } from '../index';
import type { CreateAiReviewData, ApiResponse } from '@/types/record';

export type CreateAiReviewResponse = ApiResponse<CreateAiReviewData>;

export const createAiReview = async (roomId: number) => {
  const response = await apiClient.post<CreateAiReviewResponse>(
    `/rooms/${roomId}/record/ai-review`,
  );
  return response.data;
};
