import { apiClient } from '../index';
import type { RoomPostLikeRequest, RoomPostLikeResponse } from '@/types/roomPostLike';

export const postRoomPostLike = async (
  postId: number,
  requestData: RoomPostLikeRequest,
): Promise<RoomPostLikeResponse> => {
  try {
    const response = await apiClient.post<RoomPostLikeResponse>(
      `/room-posts/${postId}/likes`,
      requestData,
    );
    return response.data;
  } catch (error: any) {
    console.error('방 게시물 좋아요 API 오류:', error);
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};
