// 내 프로필 정보 타입
export interface MyProfileData {
  creatorId?: number;
  profileImageUrl: string;
  userId?: number;
  nickname: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
  totalFeedCount: number;
  latestFollowerProfileImageUrls?: string[];
}

// 다른 사용자 프로필 정보 타입 (isFollowing 포함)
export interface OtherProfileData extends MyProfileData {
  isFollowing: boolean;
  isWriter?: boolean;
}
