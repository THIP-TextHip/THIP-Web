import { apiClient } from '../index';

export type SetCookieRequest = Record<string, never>;

export interface SetCookieResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: Record<string, unknown>;
}

export const setCookie = async (data?: SetCookieRequest): Promise<SetCookieResponse> => {
  const response = await apiClient.post<SetCookieResponse>('/auth/set-cookie', data);
  return response.data;
};
