import { apiClient } from '../index';

export interface OtherFeedItem {
  feedId: number;
  postDate: string;
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  contentBody: string;
  contentUrls: string[];
  likeCount: number;
  commentCount: number;
  isSaved: boolean;
}

export interface OtherFeedData {
  feedList: OtherFeedItem[];
}

export interface OtherFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: OtherFeedData;
}

export const getOtherFeed = async (userId: number) => {
  const response = await apiClient.get<OtherFeedResponse>(`/feeds/users/${userId}`);
  return response.data;
};
