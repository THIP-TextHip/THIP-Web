import { apiClient } from '../index';

export interface DeleteFeedPostResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: null;
}

export const deleteFeedPost = async (feedId: number) => {
  const response = await apiClient.delete<DeleteFeedPostResponse>(`/feeds/${feedId}`);
  return response.data;
};
