import { apiClient } from '../index';
import type { UpdateRecordRequest, UpdateRecordData, ApiResponse } from '@/types/record';

export type UpdateRecordResponse = ApiResponse<UpdateRecordData>;

export const updateRecord = async (
  roomId: number,
  recordId: number,
  recordData: UpdateRecordRequest,
): Promise<UpdateRecordResponse> => {
  try {
    const response = await apiClient.patch<UpdateRecordResponse>(
      `/rooms/${roomId}/records/${recordId}`,
      recordData,
    );
    return response.data;
  } catch (error) {
    console.error('기록 수정 API 오류:', error);
    throw error;
  }
};
