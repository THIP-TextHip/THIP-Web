import { apiClient } from '../index';

export interface CommentData {
  commentId: number;
  creatorId: number;
  creatorProfileImageUrl: string | null;
  creatorNickname: string;
  alias: string;
  aliasColor: string;
  postDate: string;
  content: string;
  likeCount: number;
  isLike: boolean;
  isDeleted: boolean;
  replyList: ReplyData[];
}

export interface ReplyData {
  parentCommentCreatorNickname: string;
  commentId: number;
  creatorId: number;
  creatorProfileImageUrl: string | null;
  creatorNickname: string;
  alias: string;
  aliasColor: string;
  postDate: string;
  content: string;
  likeCount: number;
  isLike: boolean;
  isDeleted: boolean;
}

export interface GetCommentsResponse {
  code: number;
  status: string;
  message: string;
  data: {
    commentList: CommentData[];
    nextCursor: string;
    isLast: boolean;
  };
}

export interface GetCommentsParams {
  size?: number;
  cursor?: string | null;
  postType: 'FEED' | 'RECORD' | 'VOTE';
}

export const getComments = async (postId: number, params: GetCommentsParams) => {
  const searchParams = new URLSearchParams();

  if (params?.size) {
    searchParams.append('size', params.size.toString());
  }

  if (params?.cursor) {
    searchParams.append('cursor', params.cursor);
  }

  searchParams.append('postType', params.postType);

  const queryString = searchParams.toString();
  const url = `/comments/${postId}?${queryString}`;

  const response = await apiClient.get<GetCommentsResponse>(url);
  return response.data;
};
