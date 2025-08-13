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

// 최근 검색어 조회 API 함수
export const getRecentSearch = async (type: SearchType) => {
  const response = await apiClient.get<GetRecentSearchResponse>(`/recent-search?type=${type}`);
  return response.data;
};

/*
// 사용 예시
const recentUserSearches = await getRecentSearch('USER');
const recentRoomSearches = await getRecentSearch('ROOM');
const recentBookSearches = await getRecentSearch('BOOK');
*/
