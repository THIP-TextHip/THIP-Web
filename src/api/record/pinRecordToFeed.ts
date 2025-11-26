import { apiClient } from '../index';
import type { ApiResponse } from '@/types/record';

export interface PinRecordData {
  bookTitle: string;
  authorName: string;
  bookImageUrl: string;
  isbn: string;
}

export type PinRecordResponse = ApiResponse<PinRecordData>;

export const pinRecordToFeed = async (roomId: number, recordId: number) => {
  const response = await apiClient.get<PinRecordResponse>(
    `/rooms/${roomId}/records/${recordId}/pin`,
  );
  return response.data;
};
