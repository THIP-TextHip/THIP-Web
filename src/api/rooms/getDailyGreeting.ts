import { apiClient } from '../index';
import { type TodayCommentItem } from '../../types/today';

export interface DailyGreetingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    todayCommentList: TodayCommentItem[];
    nextCursor: string;
    isLast: boolean;
  };
}

export interface DailyGreetingParams {
  roomId: number;
  cursor?: string;
}

export const getDailyGreeting = async ({
  roomId,
  cursor,
}: DailyGreetingParams): Promise<DailyGreetingResponse> => {
  try {
    const params = cursor ? { cursor } : {};
    const response = await apiClient.get<DailyGreetingResponse>(`/rooms/${roomId}/daily-greeting`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('오늘의 한마디 조회 API 오류:', error);
    throw error;
  }
};
