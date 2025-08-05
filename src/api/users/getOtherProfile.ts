import { apiClient } from '../index';
import type { MyProfileData } from '@/types/profile';

// API 응답 타입
export interface OtherProfileResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MyProfileData;
}

// 다른 사용자 프로필 조회 API 함수
export const getOtherProfile = async (userId: number) => {
  const response = await apiClient.get<OtherProfileResponse>(`/feeds/users/${userId}/info`);
  return response.data;
};

/*
// 다른 사용자의 프로필 정보 조회
const otherProfile = await getOtherProfile(123);
console.log(otherProfile.data.nickname); // 닉네임
console.log(otherProfile.data.followerCount); // 팔로워 수
*/
