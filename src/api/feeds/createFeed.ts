import { apiClient } from '../index';

/** 서버에 보낼 request JSON 페이로드 */
export interface CreateFeedBody {
  isbn: string;
  contentBody: string;
  isPublic: boolean;
  tagList?: string[];
  imageUrls?: string[];
}

/** 성공 응답 */
export interface CreateFeedSuccess {
  isSuccess: true;
  code: number;
  message: string;
  data: {
    feedId: number;
  };
}

/** 실패 응답 */
export interface CreateFeedFail {
  isSuccess: false;
  code: number;
  message: string;
}

export type CreateFeedResponse = CreateFeedSuccess | CreateFeedFail;

/**
 * 피드 작성 API
 * - application/json (presigned URL 방식)
 * - imageUrls: 미리 S3에 업로드한 이미지의 CloudFront URL 목록
 */
export const createFeed = async (
  body: CreateFeedBody,
): Promise<CreateFeedResponse> => {
  const { data } = await apiClient.post<CreateFeedResponse>('/feeds', body);
  return data;
};
