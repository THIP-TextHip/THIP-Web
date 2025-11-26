export interface RoomPostLikeRequest {
  type: boolean;
  roomPostType: 'RECORD' | 'VOTE';
}

export interface RoomPostLikeData {
  postId: number;
  isLiked: boolean;
}

export interface RoomPostLikeResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: RoomPostLikeData;
}
