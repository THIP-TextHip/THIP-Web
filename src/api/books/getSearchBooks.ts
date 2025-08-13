import { apiClient } from '../index';

// 검색된 책 타입 (API 응답에서 받는 형태)
export interface BookSearchItem {
  title: string;
  imageUrl: string;
  authorName: string;
  publisher: string;
  isbn: string;
}

// 검색된 책 타입 (컴포넌트에서 사용하는 형태)
export interface SearchedBook {
  id: number;
  title: string;
  author: string;
  publisher: string;
  coverUrl: string;
  isbn: string;
}

// API 응답 데이터 타입
export interface SearchBooksData {
  searchResult: BookSearchItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

// API 응답 타입
export interface SearchBooksResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: SearchBooksData;
}

export const getSearchBooks = async (
  query: string,
  page: number = 1,
  isFinalized: boolean = false,
): Promise<SearchBooksResponse> => {
  try {
    const response = await apiClient.get<SearchBooksResponse>('/books', {
      params: {
        keyword: query.trim(),
        page: page,
        isFinalized: isFinalized,
      },
    });
    return response.data;
  } catch (error) {
    console.error('책 검색 API 오류:', error);
    throw error;
  }
};

export const convertToSearchedBooks = (apiBooks: BookSearchItem[]): SearchedBook[] => {
  return apiBooks.map((book, index) => ({
    id: index + 1,
    title: book.title,
    author: book.authorName,
    publisher: book.publisher,
    coverUrl: book.imageUrl,
    isbn: book.isbn,
  }));
};
