import { apiClient } from '../index';
import type { GetMemoryPostsParams, GetMemoryPostsResponse } from '@/types/memory';

export const getMemoryPosts = async (
  params: GetMemoryPostsParams,
): Promise<GetMemoryPostsResponse> => {
  const { roomId, ...queryParams } = params;

  const searchParams = new URLSearchParams();

  searchParams.append('type', queryParams.type || 'group');

  if ((queryParams.type || 'group') === 'group' && queryParams.sort) {
    searchParams.append('sort', queryParams.sort);
  }

  if (queryParams.pageStart !== undefined && queryParams.pageStart !== null) {
    searchParams.append('pageStart', queryParams.pageStart.toString());
  }

  if (queryParams.pageEnd !== undefined && queryParams.pageEnd !== null) {
    searchParams.append('pageEnd', queryParams.pageEnd.toString());
  }

  if (queryParams.isOverview !== undefined) {
    searchParams.append('isOverview', queryParams.isOverview.toString());
  }

  if (queryParams.isPageFilter !== undefined) {
    searchParams.append('isPageFilter', queryParams.isPageFilter.toString());
  }

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
