import { apiClient } from '../index';

export interface SaveBookRequest {
  type: boolean;
}

export interface SaveBookData {
  isbn: string;
  isSaved: boolean;
}

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
