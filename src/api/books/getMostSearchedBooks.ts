import { apiClient } from '../index';

// 인기 검색 도서 타입
export interface MostSearchedBook {
  rank: number;
  title: string;
  imageUrl: string;
  isbn: string;
}

// API 응답 데이터 타입
export interface MostSearchedBooksData {
  bookList: MostSearchedBook[];
}

// API 응답 타입
export interface MostSearchedBooksResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: MostSearchedBooksData;
}

export const getMostSearchedBooks = async (): Promise<MostSearchedBooksResponse> => {
  try {
    const response = await apiClient.get<MostSearchedBooksResponse>('/books/most-searched');
    return response.data;
  } catch (error) {
    console.error('인기 검색 도서 조회 API 오류:', error);
    throw error;
  }
};
