import { apiClient } from '../index';

// 방 목록 응답 데이터 타입
export interface RoomItem {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  recruitCount: number;
  memberCount: number;
  deadlineDate: string;
}

export interface RoomsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    deadlineRoomList: RoomItem[];
    popularRoomList: RoomItem[];
    recentRoomList: RoomItem[];
  };
}

export const getRoomsByCategory = async (category: string): Promise<RoomsResponse> => {
  try {
    const response = await apiClient.get<RoomsResponse>(
      `/rooms?category=${encodeURIComponent(category)}`,
    );
    return response.data;
  } catch (error) {
    console.error('방 목록 조회 API 오류:', error);
    throw error;
  }
};
