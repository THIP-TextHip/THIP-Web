import { apiClient } from '../index';

// 모집중인 모임방 타입
export interface RecruitingRoom {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  memberCount: number;
  recruitCount: number;
  deadlineEndDate: string;
}

// API 응답 데이터 타입
export interface RecruitingRoomsData {
  recruitingRoomList: RecruitingRoom[];
  totalRoomCount: number;
  nextCursor: string;
  isLast: boolean;
}

// API 응답 타입
export interface RecruitingRoomsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: RecruitingRoomsData;
}

export const getRecruitingRooms = async (isbn: string): Promise<RecruitingRoomsResponse> => {
  try {
    const response = await apiClient.get<RecruitingRoomsResponse>(
      `/books/${isbn}/recruiting-rooms`,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('모집중인 모임방 조회 API 오류:', error);
    throw error;
  }
};
