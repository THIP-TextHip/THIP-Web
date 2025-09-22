import { apiClient } from '../index';

export interface DeleteUsersResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: null;
}

export const deleteUsers = async (): Promise<DeleteUsersResponse> => {
  const response = await apiClient.delete<DeleteUsersResponse>('/users');
  return response.data;
};
