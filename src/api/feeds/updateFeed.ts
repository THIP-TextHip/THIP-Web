import { apiClient } from '../index';

export interface UpdateFeedBody {
  contentBody: string;
  isPublic: boolean;
  tagList?: string[];
  remainImageUrls?: string[];
}

export interface UpdateFeedSuccess {
  isSuccess: true;
  code: number;
  message: string;
}
export interface UpdateFeedFail {
  isSuccess: false;
  code: number;
  message: string;
}

export type UpdateFeedResponse = UpdateFeedSuccess | UpdateFeedFail;

export const updateFeed = async (
  feedId: number,
  body: UpdateFeedBody,
): Promise<UpdateFeedResponse> => {
  try {
    const { data } = await apiClient.patch<UpdateFeedResponse>(`/feeds/${feedId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    return data;
  } catch (error) {
    console.error('수정 API 에러:', error);

    const form = new FormData();
    form.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

    const { data } = await apiClient.patch<UpdateFeedResponse>(`/feeds/${feedId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  }
};
