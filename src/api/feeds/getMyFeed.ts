import { apiClient } from '../index';
import type { PostData } from '@/types/post';

// API 응답 데이터 타입
export interface MyFeedData {
  feedList: PostData[];
  nextCursor: string;
  isLast: boolean;
}

// API 응답 타입
export interface MyFeedResponse {
  success: boolean;
  code: number;
  message: string;
  data: MyFeedData;
}

// 요청 파라미터 타입
export interface GetMyFeedParams {
  cursor?: string; // 첫 페이지는 null 또는 없음, 다음 페이지부터는 nextCursor 값 사용
}

// 내 피드 조회 API 함수
export const getMyFeeds = async (params?: GetMyFeedParams) => {
  const queryParams = new URLSearchParams();

  // cursor가 있을 때만 쿼리 파라미터에 추가
  if (params?.cursor) {
    queryParams.append('cursor', params.cursor);
  }

  const url = `/feeds/mine${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await apiClient.get<MyFeedResponse>(url);
  return response.data;
};

/*
// 첫 페이지 조회
const firstPage = await getMyFeeds();

// 다음 페이지 조회 (nextCursor 사용)
const nextPage = await getMyFeeds({ 
  cursor: firstPage.data.nextCursor 
});

// 마지막 페이지인지 확인
if (firstPage.data.isLast) {
  console.log('더 이상 불러올 데이터가 없습니다.');
}
*/
