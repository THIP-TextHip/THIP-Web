import { apiClient } from '../index';

// 저장한 책 정보 타입
export interface SavedBookInMy {
  bookId: number;
  bookTitle: string;
  authorName: string;
  publisher: string;
  bookImageUrl: string;
  isbn: string;
  isSaved: boolean;
}

export interface SavedBooksInMyData {
  bookList: SavedBookInMy[];
  nextCursor: string;
  isLast: boolean;
}

export interface SavedBooksInMyResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: SavedBooksInMyData;
}

export const getSavedBooksInMy = async (cursor: string | null = null) => {
  try {
    const params: { cursor?: string | null } = {};
    if (cursor !== null) {
      params.cursor = cursor;
    }

    const response = await apiClient.get<SavedBooksInMyResponse>('/books/saved', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('개인 저장 책 조회 API 오류:', error);
    throw error;
  }
};
