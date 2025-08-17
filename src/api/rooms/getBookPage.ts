import { apiClient } from '../index';

// 책 페이지 정보 응답 데이터 타입
export interface BookPageData {
  totalBookPage: number; // 책 전체 페이지 수
  recentBookPage: number; // 최근 기록한 페이지 번호
  isOverviewPossible: boolean; // 총평 작성 가능 여부
  roomId: number; // 방 ID
}

// API 응답 타입
export interface BookPageResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: BookPageData;
}

// 책 전체 페이지수 및 총평 작성 가능 여부 조회 API 함수
export const getBookPage = async (roomId: number): Promise<BookPageResponse> => {
  try {
    const response = await apiClient.get<BookPageResponse>(`/rooms/${roomId}/book-page`);
    return response.data;
  } catch (error) {
    console.error('책 페이지 정보 조회 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:
try {
  const result = await getBookPage(1);
  if (result.isSuccess) {
    console.log("책 전체 페이지 수:", result.data.totalBookPage);
    console.log("최근 기록한 페이지:", result.data.recentBookPage);
    console.log("총평 작성 가능:", result.data.isOverviewPossible);
    console.log("방 ID:", result.data.roomId);
    // 성공 처리 로직
  } else {
    console.error("책 페이지 정보 조회 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직 (400: 파라미터 잘못, 403: 접근 권한 없음, 404: 방 없음)
}
*/
