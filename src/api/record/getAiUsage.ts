import { apiClient } from '../index';
import type { AiUsageData, ApiResponse } from '@/types/record';

export type GetAiUsageResponse = ApiResponse<AiUsageData>;

export const getAiUsage = async (roomId: number) => {
  const response = await apiClient.get<GetAiUsageResponse>(`/rooms/${roomId}/users/ai-usage`);
  return response.data;
};
