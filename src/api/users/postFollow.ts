import { apiClient } from '../index';

export interface FollowRequest {
  type: boolean; // true: 팔로우, false: 언팔로우
}

export interface FollowResponse {
  isFollowing: boolean; // 바뀐 팔로우 상태
}

export interface FollowErrorResponse {
  isSuccess: false;
  code: number;
  message: string;
}

export const postFollow = async (followingUserId: string, type: boolean) => {
  const response = await apiClient.post<FollowResponse>(`/users/following/${followingUserId}`, {
    type,
  });
  return response.data;
};
