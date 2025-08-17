import { apiClient } from '../index';

// 최근 글 작성자 데이터 타입
export interface RecentWriterData {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

// API 응답 타입
export interface GetRecentFollowingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    myFollowingUsers: RecentWriterData[];
  };
}

// 최근 글을 작성한 내 팔로우 리스트 조회 API 함수
export const getRecentFollowing = async () => {
  const response = await apiClient.get<GetRecentFollowingResponse>(
    '/users/my-followings/recent-feeds',
  );
  return response.data;
};
