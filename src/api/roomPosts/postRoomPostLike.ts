import { apiClient } from '../index';
import type { RoomPostLikeRequest, RoomPostLikeResponse } from '@/types/roomPostLike';

// 방 게시물(기록,투표) 좋아요 상태변경 API 함수
export const postRoomPostLike = async (
  postId: number,
  requestData: RoomPostLikeRequest,
): Promise<RoomPostLikeResponse> => {
  try {
    // 🧪 테스트용: roomId 999는 완료된 모임방으로 시뮬레이션
    if (window.location.pathname.includes('/999')) {
      return {
        isSuccess: false,
        code: 50001,
        message: '완료된 모임방에서는 좋아요를 누를 수 없습니다.',
        data: {
          postId: postId,
          isLiked: false
        }
      };
    }

    const response = await apiClient.post<RoomPostLikeResponse>(
      `/room-posts/${postId}/likes`,
      requestData,
    );
    return response.data;
  } catch (error) {
    console.error('방 게시물 좋아요 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:

// 기록 게시물 좋아요
const likeRecordPost = async (postId: number, isLiked: boolean) => {
  try {
    const result = await postRoomPostLike(postId, {
      type: !isLiked, // 현재 상태 반대로 전송
      roomPostType: 'RECORD'
    });
    
    if (result.isSuccess) {
      console.log('좋아요 상태 변경 성공:', result.data.isLiked);
      console.log('게시물 ID:', result.data.postId);
      // UI 업데이트 로직
    } else {
      console.error('좋아요 상태 변경 실패:', result.message);
      // 에러 처리 로직
    }
  } catch (error) {
    console.error('API 호출 오류:', error);
    // 네트워크 에러 처리 로직
  }
};

// 투표 게시물 좋아요
const likeVotePost = async (postId: number, isLiked: boolean) => {
  try {
    const result = await postRoomPostLike(postId, {
      type: !isLiked, // 현재 상태 반대로 전송
      roomPostType: 'VOTE'
    });
    
    if (result.isSuccess) {
      console.log('좋아요 상태 변경 성공:', result.data.isLiked);
      // UI 업데이트 로직
    } else {
      console.error('좋아요 상태 변경 실패:', result.message);
    }
  } catch (error) {
    console.error('API 호출 오류:', error);
  }
};
*/
