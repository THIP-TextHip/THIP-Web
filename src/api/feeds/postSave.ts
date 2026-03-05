import { apiClient } from '../index';

export interface SaveFeedRequest {
  type: boolean;
}

export interface SaveFeedData {
  feedId: number;
  isSaved: boolean;
}

export interface SaveFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data?: SaveFeedData;
}

export const postSaveFeed = async (feedId: number, isSaved: boolean) => {
  const requestBody: SaveFeedRequest = {
    type: isSaved,
  };

  const response = await apiClient.post<SaveFeedResponse>(`/feeds/${feedId}/saved`, requestBody);
  return response.data;
};
