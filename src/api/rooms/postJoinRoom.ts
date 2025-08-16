import { apiClient } from '../index';

export interface PostJoinRoomRequest {
  type: 'join' | 'cancel';
}

export interface PostJoinRoomResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    roomId: number;
    type: string;
  };
}

export async function postJoinRoom(
  roomId: number | string,
  type: 'join' | 'cancel',
): Promise<PostJoinRoomResponse> {
  const response = await apiClient.post<PostJoinRoomResponse>(`/rooms/${roomId}/join`, { type });
  return response.data;
}
