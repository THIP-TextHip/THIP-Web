import { apiClient } from '../index';

export interface FeedDetailData {
  feedId: number;
  creatorId: number;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  alias: string;
  aliasColor: string;
  postDate: string;
  isbn: string;
  bookImageUrl: string;
  bookTitle: string;
  bookAuthor: string;
  contentBody: string;
  contentUrls: string[];
  likeCount: number;
  commentCount: number;
  isSaved: boolean;
  isLiked: boolean;
  isPublic: boolean;
  tagList: string[];
  isWriter: boolean;
}

export interface FeedDetailResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: FeedDetailData;
}

export const getFeedDetail = async (feedId: number) => {
  const response = await apiClient.get<FeedDetailResponse>(`/feeds/${feedId}`);
  return response.data;
};
