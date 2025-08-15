import { apiClient } from '../index';

// 가입한 방 목록 응답 데이터 타입
export interface JoinedRoomItem {
  roomId: number;
  bookImageUrl: string;
  roomTitle: string;
  memberCount: number;
  userPercentage: number;
}

export interface JoinedRoomsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    roomList: JoinedRoomItem[];
    nickname: string;
    page: number;
    size: number;
    last: boolean;
    first: boolean;
  };
}

export const getJoinedRooms = async (page: number = 1): Promise<JoinedRoomsResponse> => {
  try {
    const response = await apiClient.get<JoinedRoomsResponse>(`/rooms/home/joined?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('가입한 방 목록 조회 API 오류:', error);
    throw error;
  }
};
