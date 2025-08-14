import { apiClient } from '../index';

// 방 상세 정보 응답 타입
export interface RoomDetailResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    isHost: boolean;
    isJoining: boolean;
    roomId: number;
    roomName: string;
    roomImageUrl: string;
    isPublic: boolean;
    progressStartDate: string;
    progressEndDate: string;
    recruitEndDate: string;
    category: string;
    roomDescription: string;
    memberCount: number;
    recruitCount: number;
    isbn: string;
    bookImageUrl: string;
    bookTitle: string;
    authorName: string;
    bookDescription: string;
    publisher: string;
    recommendRooms: RecommendRoom[];
  };
}

export interface RecommendRoom {
  roomId: number;
  roomImageUrl: string;
  roomName: string;
  memberCount: number;
  recruitCount: number;
  recruitEndDate: string;
}

export const getRoomDetail = async (roomId: number): Promise<RoomDetailResponse> => {
  try {
    const response = await apiClient.get<RoomDetailResponse>(`/rooms/${roomId}/recruiting`);
    return response.data;
  } catch (error) {
    console.error('방 상세 정보 조회 API 오류:', error);
    throw error;
  }
};
