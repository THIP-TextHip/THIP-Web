import { apiClient } from '../index';
import { AxiosError } from 'axios';

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
  bookImageUrl: string;
  roomName: string;
  memberCount: number;
  recruitCount: number;
  recruitEndDate: string;
}

export const getRoomDetail = async (roomId: number): Promise<RoomDetailResponse> => {
  try {
    const response = await apiClient.get<RoomDetailResponse>(`/rooms/${roomId}/recruiting`);
    return response.data;
  } catch (error: unknown) {
    console.error('방 상세 정보 조회 API 오류:', error);

    if (error instanceof AxiosError) {
      // 모집기간이 만료된 방인 경우
      if (error.response?.data?.code === 100004) {
        throw new Error('모집기간이 만료된 방입니다.');
      }

      // 방 접근 권한이 없는 경우
      if (error.response?.data?.code === 140011) {
        throw new Error('방 접근 권한이 없습니다.');
      }
    }

    throw error;
  }
};
