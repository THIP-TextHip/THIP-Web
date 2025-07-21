import type { UserProfileItemProps } from '@/types/user';

export const mockUserList: UserProfileItemProps[] = [
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: 'ThipOther',
    userTitle: '칭호칭호',
    titleColor: '#FF8BAC',
    followerCount: 15,
    userId: 9,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: '하위',
    userTitle: '칭호칭호',
    titleColor: '#FF8BAC',
    followerCount: 15,
    userId: 1,
    isFollowed: true,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: '책읽으러왔음',
    userTitle: '공식 인플루언서',
    titleColor: '#A0F8E8',
    followerCount: 15,
    userId: 2,
    isFollowed: false,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: 'thip01',
    userTitle: '작가',
    titleColor: '#A0F8E8',
    followerCount: 7,
    userId: 3,
  },
];
