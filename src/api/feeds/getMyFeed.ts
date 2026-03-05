import { apiClient } from '../index';
import type { PostData } from '@/types/post';

export interface MyFeedData {
  feedList: PostData[];
  nextCursor: string;
  isLast: boolean;
}

export interface MyFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MyFeedData;
}

export interface GetMyFeedParams {
  cursor?: string;
}

export const getMyFeeds = async (params?: GetMyFeedParams) => {
  const queryParams = new URLSearchParams();

  if (params?.cursor) {
    queryParams.append('cursor', params.cursor);
  }

  const url = `/feeds/mine${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await apiClient.get<MyFeedResponse>(url);
  return response.data;
};
