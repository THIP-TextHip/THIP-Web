import { apiClient } from '../index';

export interface PostLikeRequest {
  type: boolean;
}

export interface PostLikeResponse {
  code: number;
  status: string;
  message: string;
  data: {
    commentId: number;
    isLiked: boolean;
  };
}

export const postLike = async (commentId: number, type: boolean) => {
  const response = await apiClient.post<PostLikeResponse>(`/comments/${commentId}/likes`, {
    type,
  });
  return response.data;
};
