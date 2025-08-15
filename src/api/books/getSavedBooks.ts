import { apiClient } from '../index';

// 저장한 책 정보 타입
export interface SavedBook {
  bookId: number;
  bookTitle: string;
  authorName: string;
  publisher: string;
  bookImageUrl: string;
  isbn: string;
}

// API 응답 데이터 타입
export interface SavedBooksData {
  bookList: SavedBook[];
}

// API 응답 타입
export interface SavedBooksResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: SavedBooksData;
}

// 저장한 책 또는 참여 중 모임의 책 조회
export const getSavedBooks = async (type: 'saved' | 'joining'): Promise<SavedBooksResponse> => {
  try {
    const response = await apiClient.get<SavedBooksResponse>('/books/selectable-list', {
      params: {
        type: type.toUpperCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('저장한 책 조회 API 오류:', error);
    throw error;
  }
};
