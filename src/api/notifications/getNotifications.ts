import { apiClient } from '../index';

export interface NotificationItem {
  notificationId: number;
  title: string;
  content: string;
  isChecked: boolean;
  notificationType: string;
  postDate: string;
}

export interface GetNotificationsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    notifications: NotificationItem[];
    nextCursor: string;
    isLast: boolean;
  };
}

export interface GetNotificationsParams {
  cursor?: string | null;
  type?: 'feed' | 'room';
}

export const getNotifications = async (
  params?: GetNotificationsParams,
): Promise<GetNotificationsResponse> => {
  const response = await apiClient.get<GetNotificationsResponse>('/notifications', {
    params,
  });
  return response.data;
};
