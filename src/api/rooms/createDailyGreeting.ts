import { apiClient } from '../index';

// 오늘의 한마디 작성 요청 데이터 타입
export interface CreateDailyGreetingRequest {
  content: string; // 오늘의 한마디 작성 내용
}

// 오늘의 한마디 작성 응답 데이터 타입
export interface CreateDailyGreetingData {
  attendanceCheckId: number; // 출석체크 ID
}

// API 응답 타입
export interface CreateDailyGreetingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: CreateDailyGreetingData;
}

// 오늘의 한마디 작성 API 함수
export const createDailyGreeting = async (
  roomId: number,
  content: string,
): Promise<CreateDailyGreetingResponse> => {
  try {
    const requestBody: CreateDailyGreetingRequest = {
      content,
    };

    const response = await apiClient.post<CreateDailyGreetingResponse>(
      `/rooms/${roomId}/daily-greeting`,
      requestBody,
    );

    return response.data;
  } catch (error) {
    console.error('오늘의 한마디 작성 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:
try {
  const result = await createDailyGreeting(1, "오늘도 좋은 하루 보내세요!");
  if (result.isSuccess) {
    console.log("오늘의 한마디 작성 성공:", result.data.attendanceCheckId);
    // 성공 처리 로직 (예: 성공 메시지 표시, 페이지 새로고침 등)
  } else {
    console.error("오늘의 한마디 작성 실패:", result.message);
    // 실패 처리 로직 (예: 에러 메시지 표시)
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 네트워크 에러 처리 로직
}
*/
