export type UserProfileType = 'followlist' | 'followerlist';

export interface UserProfileItemProps {
  profileImgUrl: string;
  userName: string;
  userTitle: string;
  titleColor: string;
  followerCount?: number;
  isFollowed?: boolean;
  userId: number;
  isLast?: boolean;
  type?: UserProfileType;
}
