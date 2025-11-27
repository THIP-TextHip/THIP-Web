import { apiClient } from '../index';

export interface DeleteDailyGreetingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    roomId: number;
  };
}

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
