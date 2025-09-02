import { apiClient } from '../index';

// 오늘의 한마디 삭제 응답 타입
export interface DeleteDailyGreetingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    roomId: number;
  };
}

// 오늘의 한마디 삭제 API 함수
export const deleteDailyGreeting = async (
  roomId: number,
  attendanceCheckId: number,
): Promise<DeleteDailyGreetingResponse> => {
  try {
    const response = await apiClient.delete<DeleteDailyGreetingResponse>(
      `/rooms/${roomId}/daily-greeting/${attendanceCheckId}`,
    );

    return response.data;
  } catch (error) {
    console.error('오늘의 한마디 삭제 API 오류:', error);
    throw error;
  }
};