import { apiClient } from '../index';
import type { GetMemoryPostsParams, GetMemoryPostsResponse } from '@/types/memory';

// 기록장 조회 API 함수
export const getMemoryPosts = async (
  params: GetMemoryPostsParams,
): Promise<GetMemoryPostsResponse> => {
  const { roomId, ...queryParams } = params;

  // 쿼리 파라미터 생성
  const searchParams = new URLSearchParams();

  // 기본값 적용
  searchParams.append('type', queryParams.type || 'group');

  // type이 group인 경우만 sort 파라미터 추가
  if ((queryParams.type || 'group') === 'group' && queryParams.sort) {
    searchParams.append('sort', queryParams.sort);
  }

  // 페이지 필터 파라미터
  if (queryParams.pageStart !== undefined && queryParams.pageStart !== null) {
    searchParams.append('pageStart', queryParams.pageStart.toString());
  }
  if (queryParams.pageEnd !== undefined && queryParams.pageEnd !== null) {
    searchParams.append('pageEnd', queryParams.pageEnd.toString());
  }

  // 필터 파라미터
  if (queryParams.isOverview !== undefined) {
    searchParams.append('isOverview', queryParams.isOverview.toString());
  }
  if (queryParams.isPageFilter !== undefined) {
    searchParams.append('isPageFilter', queryParams.isPageFilter.toString());
  }

  // 커서 파라미터
  if (queryParams.cursor) {
    searchParams.append('cursor', queryParams.cursor);
  }

  const url = `/rooms/${roomId}/posts?${searchParams.toString()}`;

  try {
    const response = await apiClient.get<GetMemoryPostsResponse>(url);
    return response.data;
  } catch (error) {
    console.error('기록장 조회 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:

// 그룹 기록 전체 조회 (기본)
const groupPosts = await getMemoryPosts({
  roomId: 1
});

// 내 기록만 조회
const myPosts = await getMemoryPosts({
  roomId: 1,
  type: 'mine'
});

// 그룹 기록 인기순 정렬
const popularPosts = await getMemoryPosts({
  roomId: 1,
  type: 'group',
  sort: 'like'
});

// 페이지 필터 적용 (10-20페이지)
const pagePosts = await getMemoryPosts({
  roomId: 1,
  type: 'group',
  pageStart: 10,
  pageEnd: 20,
  isPageFilter: true
});

// 총평 보기 필터
const overviewPosts = await getMemoryPosts({
  roomId: 1,
  type: 'group',
  isOverview: true
});

// 페이지네이션 (다음 페이지)
const nextPagePosts = await getMemoryPosts({
  roomId: 1,
  cursor: 'some-cursor-value'
});

console.log('Posts:', groupPosts.data.postList);
console.log('Next cursor:', groupPosts.data.nextCursor);
console.log('Is last page:', groupPosts.data.isLast);
*/
