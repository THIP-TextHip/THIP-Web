export interface FollowData {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  aliasName: string;
  aliasColor?: string;
  followerCount?: number;
  isFollowing?: boolean;
}
