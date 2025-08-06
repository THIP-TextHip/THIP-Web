import type { UserProfileItemProps } from '@/types/user';

export const mockUserList: UserProfileItemProps[] = [
  {
    profileImgUrl: 'https://placehold.co/36x36',
    nickName: 'ThipOther',
    aliasName: '칭호칭호',
    aliasColor: '#FF8BAC',
    followerCount: 15,
    userId: 9,
    isFollowing: false,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    nickName: '하위',
    aliasName: '칭호칭호',
    aliasColor: '#FF8BAC',
    followerCount: 15,
    userId: 1,
    isFollowing: true,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    nickName: '책읽으러왔음',
    aliasName: '공식 인플루언서',
    aliasColor: '#A0F8E8',
    followerCount: 15,
    userId: 2,
    isFollowing: false,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    nickName: 'thip01',
    aliasName: '작가',
    aliasColor: '#A0F8E8',
    followerCount: 7,
    userId: 3,
    isFollowing: false,
  },
];
