import { apiClient } from '../index';

/** 서버에 보낼 request JSON 페이로드 */
export interface CreateFeedBody {
  isbn: string;
  contentBody: string;
  isPublic: boolean;
  tagList?: string[];
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
 * - multipart/form-data
 *   - request: application/json (Blob로 감싸 전송)
 *   - images: File[] (선택값, 없으면 미첨부)
 */
export const createFeed = async (
  body: CreateFeedBody,
  images?: File[],
): Promise<CreateFeedResponse> => {
  const form = new FormData();

  // request 파트(JSON) - 필수
  form.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

  // images 파트들 - 선택
  if (images && images.length > 0) {
    images.forEach(file => form.append('images', file));
  }

  const { data } = await apiClient.post<CreateFeedResponse>('/feeds', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};
