import { apiClient } from '../index';

// 요청 바디 타입
export interface SaveFeedRequest {
  type: boolean; // true: 저장, false: 저장 취소
}

// 응답 데이터 타입
export interface SaveFeedData {
  feedId: number;
  isSaved: boolean;
}

// API 응답 타입
export interface SaveFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data?: SaveFeedData; // 성공 시에만 존재
}

// 피드 저장/저장 취소 API 함수
export const postSaveFeed = async (feedId: number, isSaved: boolean) => {
  const requestBody: SaveFeedRequest = {
    type: isSaved, // 현재 저장 상태로 변경
  };

  const response = await apiClient.post<SaveFeedResponse>(`/feeds/${feedId}/saved`, requestBody);
  return response.data;
};

/*
사용 방법:

// 피드 저장
const saveResult = await postSaveFeed(123, true);
if (saveResult.isSuccess) {
  console.log('저장 성공:', saveResult.data?.isSaved);
} else {
  console.log('저장 실패:', saveResult.message);
}

// 피드 저장 취소
const unsaveResult = await postSaveFeed(123, false);
if (unsaveResult.isSuccess) {
  console.log('저장 취소 성공:', unsaveResult.data?.isSaved);
} else {
  console.log('저장 취소 실패:', unsaveResult.message);
}
*/
