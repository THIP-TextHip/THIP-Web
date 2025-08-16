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
  try {
    const response = await apiClient.post<PostCloseRoomResponse>(`/rooms/${roomId}/close`);
    return response.data;
  } catch (error) {
    console.error('방 닫기 API 오류:', error);
    throw error;
  }
}
