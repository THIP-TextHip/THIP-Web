import type { UserProfileItemProps } from '@/types/user';

export const mockUserList: UserProfileItemProps[] = [
  {
    profileImageUrl: 'https://placehold.co/36x36',
    nickname: 'ThipOther',
    aliasName: '칭호칭호',
    aliasColor: '#FF8BAC',
    followerCount: 15,
    userId: 9,
    isFollowing: false,
  },
  {
    profileImageUrl: 'https://placehold.co/36x36',
    nickname: '하위',
    aliasName: '칭호칭호',
    aliasColor: '#FF8BAC',
    followerCount: 15,
    userId: 1,
    isFollowing: true,
  },
  {
    profileImageUrl: 'https://placehold.co/36x36',
    nickname: '책읽으러왔음',
    aliasName: '공식 인플루언서',
    aliasColor: '#A0F8E8',
    followerCount: 15,
    userId: 2,
    isFollowing: false,
  },
  {
    profileImageUrl: 'https://placehold.co/36x36',
    nickname: 'thip01',
    aliasName: '작가',
    aliasColor: '#A0F8E8',
    followerCount: 7,
    userId: 3,
    isFollowing: false,
  },
];
