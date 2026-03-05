import { apiClient } from '../index';
import type { CreateRecordRequest, CreateRecordData, ApiResponse } from '@/types/record';

export type CreateRecordResponse = ApiResponse<CreateRecordData>;

export const createRecord = async (roomId: number, recordData: CreateRecordRequest) => {
  const response = await apiClient.post<CreateRecordResponse>(
    `/rooms/${roomId}/record`,
    recordData,
  );
  return response.data;
};
