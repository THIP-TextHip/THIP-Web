import { apiClient } from '../index';

export interface BookPageData {
  totalBookPage: number;
  recentBookPage: number;
  isOverviewPossible: boolean;
  roomId: number;
}

export interface BookPageResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: BookPageData;
}

export const getBookPage = async (roomId: number): Promise<BookPageResponse> => {
  try {
    const response = await apiClient.get<BookPageResponse>(`/rooms/${roomId}/book-page`);
    return response.data;
  } catch (error) {
    console.error('책 페이지 정보 조회 API 오류:', error);
    throw error;
  }
};
