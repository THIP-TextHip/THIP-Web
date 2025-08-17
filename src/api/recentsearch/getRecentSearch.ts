import { apiClient } from '../index';

// 최근 검색어 유형
export type SearchType = 'USER' | 'ROOM' | 'BOOK';

// 최근 검색어 데이터 타입
export interface RecentSearchData {
  recentSearchId: number;
  searchTerm: string;
}

// API 응답 타입
export interface GetRecentSearchResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    recentSearchList: RecentSearchData[];
  };
}

export const getRecentSearch = async (type: SearchType) => {
  const response = await apiClient.get<GetRecentSearchResponse>(`/recent-searches?type=${type}`);
  return response.data;
};
