import { apiClient } from '../index';

export interface PostNotificationsCheckRequest {
  notificationId: number;
}

export interface PostNotificationsCheckResponse<Params = Record<string, unknown>> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    route: string; // e.g., 'POST_DETAIL'
    params?: Params; // e.g., { postId: 123 }
  };
}

// 알림 확인(체크) 및 이동 정보 반환 API
export const postNotificationsCheck = async (notificationId: number) => {
  const body: PostNotificationsCheckRequest = { notificationId };
  const response = await apiClient.post<PostNotificationsCheckResponse>(
    '/notifications/check',
    body,
  );
  return response.data;
};
