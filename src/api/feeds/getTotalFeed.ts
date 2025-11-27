import { apiClient } from '../index';
import type { PostData } from '@/types/post';

export interface TotalFeedData {
  feedList: PostData[];
  nextCursor: string;
  isLast: boolean;
}

export interface TotalFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: TotalFeedData;
}

export interface GetTotalFeedParams {
  cursor?: string;
}

export const getTotalFeeds = async (params?: GetTotalFeedParams) => {
  const queryParams = new URLSearchParams();

  if (params?.cursor) {
    queryParams.append('cursor', params.cursor);
  }

  const url = `/feeds${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await apiClient.get<TotalFeedResponse>(url);
  return response.data;
};
