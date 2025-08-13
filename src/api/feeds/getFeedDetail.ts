import { apiClient } from '../index';

// 피드 상세 정보 타입 (PostData + 추가 필드들)
export interface FeedDetailData {
  feedId: number;
  creatorId: number;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  alias: string;
  aliasColor: string;
  postDate: string;
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  contentBody: string;
  contentUrls: string[];
  likeCount: number;
  commentCount: number;
  isSaved: boolean;
  isLiked: boolean;
  tagList: string[];
}

// API 응답 타입
export interface FeedDetailResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: FeedDetailData;
}

// 피드 상세 조회 API 함수
export const getFeedDetail = async (feedId: number) => {
  const response = await apiClient.get<FeedDetailResponse>(`/feeds/${feedId}`);
  return response.data;
};

/*
// 피드 상세 정보 조회
const feedDetail = await getFeedDetail(123);
console.log(feedDetail.data.feedId); // 123
console.log(feedDetail.data.tagList); // ["태그1", "태그2"]
*/
