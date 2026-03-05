import { apiClient } from '../index';
import type { CreateRoomRequest, CreateRoomData, ApiResponse } from '@/types/room';

export type CreateRoomResponse = ApiResponse<CreateRoomData>;

export const createRoom = async (roomData: CreateRoomRequest) => {
  const response = await apiClient.post<CreateRoomResponse>('rooms', roomData);
  return response.data;
};
