import { apiClient } from '../index';

export interface PostReplyRequest {
  content: string;
  isReplyRequest: boolean;
  parentId: number | null;
  postType: 'FEED' | 'RECORD' | 'VOTE';
}

export interface PostReplyResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    commentId: number;
  };
}

export const postReply = async (postId: number, request: PostReplyRequest) => {
  try {
    const response = await apiClient.post<PostReplyResponse>(`/comments/${postId}`, request);
    return response.data;
  } catch (error: any) {
    console.error('댓글 작성 API 오류:', error);
    // 서버에서 에러 응답을 보낸 경우 해당 응답을 반환
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};
