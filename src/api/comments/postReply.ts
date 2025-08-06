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
  const response = await apiClient.post<PostReplyResponse>(`/comments/${postId}`, request);
  return response.data;
};
