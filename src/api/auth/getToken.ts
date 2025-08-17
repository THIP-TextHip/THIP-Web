import { apiClient } from '../index';

export interface GetTokenRequest {
  loginTokenKey: string; // 인가코드
}

export interface GetTokenResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    token: string; // 토큰
  };
}

export const getToken = async (data: GetTokenRequest): Promise<GetTokenResponse> => {
  const response = await apiClient.post<GetTokenResponse>('/auth/token', data);
  return response.data;
};
