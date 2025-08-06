import { apiClient } from '../index';
import type { MyProfileData } from '@/types/profile';

// API 응답 타입
export interface MyProfileResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MyProfileData;
}

// 내 프로필 조회 API 함수
export const getMyProfile = async () => {
  const response = await apiClient.get<MyProfileResponse>('/feeds/mine/info');
  return response.data;
};

/*
// 내 프로필 정보 조회
const myProfile = await getMyProfile();
console.log(myProfile.data.nickname); // 닉네임
console.log(myProfile.data.followerCount); // 팔로워 수
*/
