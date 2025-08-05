// 내 프로필 정보 타입
export interface MyProfileData {
  userId: number;
  profileImageUrl: string;
  nickname: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
  totalFeedCount: number;
  latestFollowerProfileImageUrls?: string[];
}
