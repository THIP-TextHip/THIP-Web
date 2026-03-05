import { apiClient } from '../index';
import type { MyProfileData } from '@/types/profile';
export interface MyProfileResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MyProfileData;
}

export const getMyProfile = async () => {
  const response = await apiClient.get<MyProfileResponse>('/feeds/mine/info');
  return response.data;
};
