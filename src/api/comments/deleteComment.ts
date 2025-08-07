import { apiClient } from '../index';

export interface DeleteCommentRequest {
  commentId: number;
}

export interface DeleteCommentResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    postId: number; // 삭제한 댓글이 속한 게시글 ID
  };
}

export const deleteComment = async (commentId: number) => {
  const response = await apiClient.delete<DeleteCommentResponse>(`/comments/${commentId}`, {
    data: { commentId },
  });
  return response.data;
};
