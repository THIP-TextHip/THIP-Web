export type UserProfileType = 'followlist' | 'followerlist';

export interface UserProfileItemProps {
  profileImgUrl: string;
  nickname: string;
  aliasName: string;
  aliasColor?: string;
  followerCount?: number;
  isFollowing?: boolean;
  userId: number;
  isLast?: boolean;
  type?: UserProfileType;
  isMyself?: boolean;
}
