import { apiClient } from '../index';

export interface PostCloseRoomResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    roomId: number;
  };
}

export async function postCloseRoom(roomId: number | string): Promise<PostCloseRoomResponse> {
  const response = await apiClient.post<PostCloseRoomResponse>(`/rooms/${roomId}/close`);
  return response.data;
}
