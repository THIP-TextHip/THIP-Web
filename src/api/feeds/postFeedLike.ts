import { apiClient } from '../index';

export interface PostFeedLikeRequest {
  type: boolean;
}

export interface PostFeedLikeResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    feedId: number;
    isLiked: boolean;
  };
}

export const postFeedLike = async (feedId: number, type: boolean) => {
  const response = await apiClient.post<PostFeedLikeResponse>(`/feeds/${feedId}/likes`, {
    type,
  });
  return response.data;
};
