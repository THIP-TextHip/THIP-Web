import { apiClient } from '../index';
import type { FollowData } from '@/types/follow';

export interface FollowerListResponse {
  followers: FollowData[];
  nextCursor: string;
  isLast: boolean;
}

export interface GetFollowerListParams {
  size?: number; // 1~10 사이, default: 10
  cursor?: string | null; // 첫 요청시 null, 이후 nextCursor 값
}

export const getFollowerList = async (userId: string, params?: GetFollowerListParams) => {
  const queryParams = new URLSearchParams();

  const size = params?.size || 10;
  if (size >= 1 && size <= 10) {
    queryParams.append('size', size.toString());
  }

  if (params?.cursor) {
    queryParams.append('cursor', params.cursor);
  }

  const url = `/users/${userId}/followers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await apiClient.get<FollowerListResponse>(url);
  return response.data;
};
