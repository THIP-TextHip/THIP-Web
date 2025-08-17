// 방 게시물 좋아요 요청 데이터 타입
export interface RoomPostLikeRequest {
  type: boolean; // true: 좋아요, false: 좋아요 취소
  roomPostType: 'RECORD' | 'VOTE'; // 방 게시물 타입
}

// 방 게시물 좋아요 응답 데이터 타입
export interface RoomPostLikeData {
  postId: number; // 게시물 ID
  isLiked: boolean; // 좋아요 상태
}

// API 응답 타입
export interface RoomPostLikeResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: RoomPostLikeData;
}
