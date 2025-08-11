import { apiClient } from '../index';

export interface PostNicknameRequest {
  nickname: string;
}

export interface PostNicknameResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: { isVerified: boolean };
}

export const postNickname = async (nickname: string): Promise<PostNicknameResponse> => {
  const response = await apiClient.post<PostNicknameResponse>('/users/nickname', {
    nickname,
  });
  return response.data;
};
