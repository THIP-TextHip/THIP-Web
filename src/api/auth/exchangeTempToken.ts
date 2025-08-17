import { apiClient } from '../index';

export type ExchangeTempTokenRequest = Record<string, never>;

export interface ExchangeTempTokenResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    accessToken: string;
    // 기타 필요한 응답 데이터
  };
}

export const exchangeTempToken = async (
  data?: ExchangeTempTokenRequest,
): Promise<ExchangeTempTokenResponse> => {
  const response = await apiClient.post<ExchangeTempTokenResponse>(
    '/auth/exchange-temp-token',
    data,
  );
  return response.data;
};
