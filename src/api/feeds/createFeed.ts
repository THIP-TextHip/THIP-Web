import { apiClient } from '../index';

export interface CreateFeedBody {
  isbn: string;
  contentBody: string;
  isPublic: boolean;
  tagList?: string[];
  imageUrls?: string[];
}

export interface CreateFeedSuccess {
  isSuccess: true;
  code: number;
  message: string;
  data: {
    feedId: number;
  };
}

export interface CreateFeedFail {
  isSuccess: false;
  code: number;
  message: string;
}

export type CreateFeedResponse = CreateFeedSuccess | CreateFeedFail;

export const createFeed = async (body: CreateFeedBody): Promise<CreateFeedResponse> => {
  const { data } = await apiClient.post<CreateFeedResponse>('/feeds', body);
  return data;
};
