import { apiClient } from '../index';

export interface GetNotificationExistResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  requestId: string;
  data: {
    exists: boolean;
  };
}

export const getNotificationExist = async (): Promise<GetNotificationExistResponse> => {
  const response = await apiClient.get<GetNotificationExistResponse>(
    '/notifications/exists-unchecked',
  );
  return response.data;
};
