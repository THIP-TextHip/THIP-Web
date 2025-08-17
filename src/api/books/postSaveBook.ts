import { apiClient } from '../index';

// 북마크 요청 타입
export interface SaveBookRequest {
  type: boolean;
}

// 북마크 응답 데이터 타입
export interface SaveBookData {
  isbn: string;
  isSaved: boolean;
}

// 북마크 응답 타입
export interface SaveBookResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: SaveBookData;
}

export const postSaveBook = async (isbn: string, type: boolean): Promise<SaveBookResponse> => {
  try {
    const response = await apiClient.post<SaveBookResponse>(`/books/${isbn}/saved`, {
      type: type,
    });
    return response.data;
  } catch (error) {
    console.error('책 저장 API 오류:', error);
    throw error;
  }
};
