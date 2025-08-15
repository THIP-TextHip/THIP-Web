import { apiClient } from '../index';

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

export const convertRoomMembersToMembers = (roomMembers: RoomMember[]): Member[] => {
  const convertedMembers = roomMembers.map(member => {
    const memberData = member as any;

    // 다양한 가능한 필드명들을 체크
    const alias = memberData.alias || memberData.aliasName || memberData.role || '독서메이트';
    const followerCount =
      memberData.subscriberCount || memberData.followerCount || memberData.followersCount || 0;
    const imageUrl = memberData.imageUrl || memberData.profileImageUrl || memberData.image;

    const convertedMember = {
      id: member.userId.toString(),
      nickname: member.nickname,
      role: alias,
      followersCount: followerCount,
      profileImageUrl: imageUrl,
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
