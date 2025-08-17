import { apiClient } from '../index';

export interface PostPasswordRequest {
  password: string;
}

export interface PostPasswordResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    matched: boolean;
    roomId: number;
  };
}

export const postPassword = async (
  roomId: number,
  data: PostPasswordRequest,
): Promise<PostPasswordResponse> => {
  const response = await apiClient.post<PostPasswordResponse>(`/rooms/${roomId}/password`, data);
  return response.data;
};
