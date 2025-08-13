import { apiClient } from '../index';

// 책 상세 정보 타입
export interface BookDetail {
  title: string;
  imageUrl: string;
  authorName: string;
  publisher: string;
  isbn: string;
  description: string;
  recruitingRoomCount: number;
  readCount: number;
  isSaved: boolean;
}

// API 응답 타입
export interface BookDetailResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: BookDetail;
}

export const getBookDetail = async (isbn: string): Promise<BookDetailResponse> => {
  try {
    const response = await apiClient.get<BookDetailResponse>(`/books/${isbn}`);

    return response.data;
  } catch (error) {
    console.error('책 상세 정보 API 오류:', error);
    throw error;
  }
};
