import { apiClient } from '../index';

export interface MostSearchedBook {
  rank: number;
  title: string;
  imageUrl: string;
  isbn: string;
}

export interface MostSearchedBooksData {
  bookList: MostSearchedBook[];
}

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
