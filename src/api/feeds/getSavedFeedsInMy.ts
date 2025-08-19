import { apiClient } from '../index';

// 개인적으로 저장한 피드 정보 타입
export interface SavedFeedInMy {
  feedId: number;
  creatorId: number;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  aliasName: string;
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
  isWriter: boolean;
}

// API 응답 데이터 타입 (무한스크롤 지원)
export interface SavedFeedsInMyData {
  feedList: SavedFeedInMy[];
  nextCursor: string;
  isLast: boolean;
}

// API 응답 타입
export interface SavedFeedsInMyResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: SavedFeedsInMyData;
}

// 개인적으로 저장한 피드 목록 조회 API 함수 (무한스크롤)
export const getSavedFeedsInMy = async (cursor: string | null = null) => {
  try {
    const params: { cursor?: string | null } = {};
    if (cursor !== null) {
      params.cursor = cursor;
    }

    const response = await apiClient.get<SavedFeedsInMyResponse>('/feeds/saved', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('개인 저장 피드 조회 API 오류:', error);
    throw error;
  }
};

/*
// 사용 예시 (무한스크롤)
const savedFeedsInMy = await getSavedFeedsInMy();
console.log(savedFeedsInMy.data.feedList); // 저장된 피드 목록
console.log(savedFeedsInMy.data.nextCursor); // 다음 페이지 커서
console.log(savedFeedsInMy.data.isLast); // 마지막 페이지 여부

// 다음 페이지 로드
if (!savedFeedsInMy.data.isLast) {
  const nextPage = await getSavedFeedsInMy(savedFeedsInMy.data.nextCursor);
}
*/
