import { apiClient } from '../index';
import type { ApiResponse } from '@/types/record';

export interface DeleteRecordData {
  roomId: number;
}

export type DeleteRecordResponse = ApiResponse<DeleteRecordData>;

export const deleteRecord = async (
  roomId: number,
  recordId: number,
): Promise<DeleteRecordResponse> => {
  try {
    const response = await apiClient.delete<DeleteRecordResponse>(
      `/rooms/${roomId}/record/${recordId}`,
    );
    return response.data;
  } catch (error) {
    console.error('기록 삭제 API 오류:', error);
    throw error;
  }
};
