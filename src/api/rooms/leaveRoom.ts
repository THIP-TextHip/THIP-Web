import { apiClient } from '../index';

// 방 나가기 응답 타입
export interface LeaveRoomResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: string;
}

// 방 나가기 API 함수
export const leaveRoom = async (roomId: number): Promise<LeaveRoomResponse> => {
  try {
    const response = await apiClient.delete<LeaveRoomResponse>(`/rooms/${roomId}/leave`);

    return response.data;
  } catch (error) {
    console.error('방 나가기 API 오류:', error);
    throw error;
  }
};