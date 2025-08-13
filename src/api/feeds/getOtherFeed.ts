import { apiClient } from '../index';

// 다른 사용자의 피드 아이템 타입
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

// API 응답 데이터 타입
export interface OtherFeedData {
  feedList: OtherFeedItem[];
}

// API 응답 타입
export interface OtherFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: OtherFeedData;
}

// 다른 사용자 피드 조회 API 함수
export const getOtherFeed = async (userId: number) => {
  const response = await apiClient.get<OtherFeedResponse>(`/feeds/users/${userId}`);
  return response.data;
};

/*
다른 사용자의 피드 리스트 조회
const otherUserFeed = await getOtherFeed(123);
console.log(otherUserFeed.data.feedList); // OtherFeedItem[]
*/
