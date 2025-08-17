import { apiClient } from '../index';

export interface PostSignupRequest {
  aliasName: string;
  nickname: string;
  isTokenRequired: boolean;
}

export interface PostSignupResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    userId: number;
    accessToken: string; // 회원가입 완료 후 받는 access 토큰
  };
}

export const postSignup = async (data: PostSignupRequest): Promise<PostSignupResponse> => {
  const response = await apiClient.post<PostSignupResponse>('/users/signup', data);
  return response.data;
};
