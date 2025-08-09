import { apiClient } from '../index';

export interface GetMyProfileResponse {
  code: number;
  status: string;
  message: string;
  data: {
    profileImageUrl: string;
    nickname: string;
    aliasName: string;
  };
}

export const getMyProfile = async () => {
  const response = await apiClient.get<GetMyProfileResponse>('/users/my-page');
  return response.data.data;
};
