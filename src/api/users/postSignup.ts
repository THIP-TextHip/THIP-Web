import { apiClient } from '../index';

export interface PostSignupRequest {
  aliasName: string;
  nickname: string;
  isTokenRequired: boolean;
}

export interface PostSignupResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    userId: number;
  };
}

export const postSignup = async (data: PostSignupRequest): Promise<PostSignupResponse> => {
  const response = await apiClient.post<PostSignupResponse>('/users/signup', data);
  return response.data;
};
