import { apiClient } from '../index';

export interface RoomMember {
  userId: number;
  nickname: string;
  imageUrl: string;
  alias: string;
  followerCount: number;
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

export const convertRoomMembersToMembers = (roomMembers: RoomMember[]): Member[] => {
  const convertedMembers = roomMembers.map(member => {
    const convertedMember: Member = {
      id: member.userId.toString(),
      nickname: member.nickname || '익명',
      role: member.alias || '독서메이트',
      followersCount: member.followerCount || 0,
      profileImageUrl: member.imageUrl || undefined,
    };

    return convertedMember;
  });

  return convertedMembers;
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
