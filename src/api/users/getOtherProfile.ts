import { apiClient } from '../index';
import type { OtherProfileData } from '@/types/profile';
export interface OtherProfileResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: OtherProfileData;
}

export const getOtherProfile = async (userId: number) => {
  const response = await apiClient.get<OtherProfileResponse>(`/feeds/users/${userId}/info`);
  return response.data;
};
