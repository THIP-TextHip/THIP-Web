import { apiClient } from '../index';

export interface CreateDailyGreetingRequest {
  content: string;
}

export interface CreateDailyGreetingData {
  attendanceCheckId: number;
}

export interface CreateDailyGreetingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: CreateDailyGreetingData;
}

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
