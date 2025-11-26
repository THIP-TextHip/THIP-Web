import { apiClient } from '../index';

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

export interface SavedFeedsInMyData {
  feedList: SavedFeedInMy[];
  nextCursor: string;
  isLast: boolean;
}

export interface SavedFeedsInMyResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: SavedFeedsInMyData;
}

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
