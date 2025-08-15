import { apiClient } from '../index';

// 독서메이트 정보 타입
export interface RoomMember {
  userId: number;
  nickname: string;
  imageUrl: string;
  alias: string;
  subscriberCount: number;
}

// 독서메이트 조회 응답 타입
export interface RoomMembersResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    userList: RoomMember[];
  };
}

// 기존 Member 타입과 연결하기 위한 변환 함수
export interface Member {
  id: string;
  nickname: string;
  role: string;
  followersCount?: number;
  profileImageUrl?: string;
}

// API 데이터를 Member 형태로 변환하는 함수
export const convertRoomMembersToMembers = (roomMembers: RoomMember[]): Member[] => {
  return roomMembers.map(member => ({
    id: member.userId.toString(),
    nickname: member.nickname,
    role: member.alias, // alias를 role로 사용
    followersCount: member.subscriberCount,
    profileImageUrl: member.imageUrl,
  }));
};

export const getRoomMembers = async (roomId: number): Promise<RoomMembersResponse> => {
  try {
    const response = await apiClient.get<RoomMembersResponse>(`/rooms/${roomId}/users`);
    return response.data;
  } catch (error) {
    console.error('독서메이트 조회 API 오류:', error);
    throw error;
  }
};
