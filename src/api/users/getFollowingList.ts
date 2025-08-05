import { apiClient } from '../index';
import type { FollowData } from '@/types/follow';

export interface FollowingListResponse {
  followers: FollowData[];
  nextCursor: string;
  isLast: boolean;
}

export interface GetFollowingListParams {
  size?: number; // 1~10 사이, default: 10
  cursor?: string | null; // 첫 요청시 null, 이후 nextCursor 값
}

export const getFollowingList = async (params?: GetFollowingListParams) => {
  const queryParams = new URLSearchParams();

  const size = params?.size || 10;
  if (size >= 1 && size <= 10) {
    queryParams.append('size', size.toString());
  }

  if (params?.cursor) {
    queryParams.append('cursor', params.cursor);
  }

  const url = `/users/my/following${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await apiClient.get<FollowingListResponse>(url);
  return response.data;
};
