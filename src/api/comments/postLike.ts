import { apiClient } from '../index';

export interface PostLikeRequest {
  type: boolean;
}

export interface PostLikeResponse {
  isSuccess: boolean;
  code: number;
  status: string;
  message: string;
  data: {
    commentId: number;
    isLiked: boolean;
  };
}

export const postLike = async (commentId: number, type: boolean) => {
  try {
    const response = await apiClient.post<PostLikeResponse>(`/comments/${commentId}/likes`, {
      type,
    });
    return response.data;
  } catch (error: any) {
    console.error('댓글 좋아요 API 오류:', error);
    // 서버에서 에러 응답을 보낸 경우 해당 응답을 반환
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};
