import { apiClient } from '../index';

export type RoomType = 'playingAndRecruiting' | 'recruiting' | 'playing' | 'expired';

// 방 데이터 타입
export interface Room {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  recruitCount: number;
  memberCount: number;
  endDate: string;
  type: string;
}

// 내 방 조회 응답 타입
export interface MyRoomsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    roomList: Room[];
    nextCursor: string;
    isLast: boolean;
  };
}

export const getMyRooms = async (
  type: RoomType = 'playingAndRecruiting',
  cursor: string | null = null,
): Promise<MyRoomsResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('type', type);
    if (cursor) {
      params.append('cursor', cursor);
    }
    const response = await apiClient.get<MyRoomsResponse>(`/rooms/my?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('내 방 조회 API 오류:', error);
    throw error;
  }
};
