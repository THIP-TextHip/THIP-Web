import { apiClient } from '../index';

// 최근 검색어 삭제 응답 타입
export interface DeleteRecentSearchResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: string;
}

export const deleteRecentSearch = async (
  recentSearchId: number,
  userId: number,
): Promise<DeleteRecentSearchResponse> => {
  try {
    const response = await apiClient.delete<DeleteRecentSearchResponse>(
      `/recent-searches/${recentSearchId}?userId=${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error('최근 검색어 삭제 API 오류:', error);
    throw error;
  }
};
