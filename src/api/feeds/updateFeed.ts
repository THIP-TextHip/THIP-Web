import { apiClient } from '../index';

/** 피드 수정 요청 바디 타입 */
export interface UpdateFeedBody {
  contentBody: string;
  isPublic: boolean;
  tagList?: string[]; // 선택 필드
  remainImageUrls?: string[]; // 기존 이미지 중 유지할 URL들
}

/** 성공 응답 */
export interface UpdateFeedSuccess {
  isSuccess: true;
  code: number;
  message: string;
}

/** 실패 응답 */
export interface UpdateFeedFail {
  isSuccess: false;
  code: number;
  message: string;
}

export type UpdateFeedResponse = UpdateFeedSuccess | UpdateFeedFail;

/**
 * 피드 수정 API
 * - multipart/form-data
 *   - request: application/json (Blob로 감싸 전송)
 *   - 이미지 추가는 불가능, 기존 이미지 삭제만 가능
 */
export const updateFeed = async (
  feedId: number,
  body: UpdateFeedBody,
): Promise<UpdateFeedResponse> => {
  // FormData 대신 JSON으로 시도
  console.log('수정 API 요청 (JSON):', {
    url: `/feeds/${feedId}`,
    body: body,
  });

  try {
    const { data } = await apiClient.patch<UpdateFeedResponse>(`/feeds/${feedId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('수정 API 응답:', data);
    return data;
  } catch (error) {
    console.error('수정 API 에러:', error);

    // FormData로 재시도
    console.log('FormData로 재시도...');
    const form = new FormData();
    form.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

    const { data } = await apiClient.patch<UpdateFeedResponse>(`/feeds/${feedId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  }
};

/*
사용 예시:

// 기존 이미지 일부 유지 (새 이미지 추가는 불가)
const updateBody: UpdateFeedBody = {
  contentBody: "수정된 글 내용입니다!",
  isPublic: true,
  tagList: ["한국소설", "책추천", "역사"],
  remainImageUrls: ["https://img.domain.com/1.jpg"] // 기존 이미지 중 유지할 것들
};

try {
  const result = await updateFeed(123, updateBody);
  if (result.isSuccess) {
    console.log('피드 수정 성공:', result.message);
  } else {
    console.error('피드 수정 실패:', result.message);
  }
} catch (error) {
  console.error('네트워크 오류:', error);
}

// 모든 이미지 삭제 후 텍스트만 수정
const textOnlyUpdate: UpdateFeedBody = {
  contentBody: "텍스트만 수정",
  isPublic: false,
  tagList: [],
  remainImageUrls: [] // 모든 기존 이미지 삭제
};

const result = await updateFeed(123, textOnlyUpdate);
*/
