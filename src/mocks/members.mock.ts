export interface Member {
  id: string;
  nickname: string;
  role: string;
  profileImage: string;
  points: number;
  followers: string;
}

export const mockMembers: Member[] = [
  {
    id: '1',
    nickname: 'Thiper',
    role: '칭호칭호',
    profileImage: '', // 빈 문자열로 기본 이미지 처리
    points: 0,
    followers: '00명이 띱 하는 중',
  },
  {
    id: '2',
    nickname: 'thipthip',
    role: '공식 인플루언서',
    profileImage: '',
    points: 0,
    followers: '00명이 띱 하는 중',
  },
  {
    id: '3',
    nickname: 'Thiper',
    role: '청춘청춘',
    profileImage: '',
    points: 0,
    followers: '00명이 띱 하는 중',
  },
  {
    id: '4',
    nickname: 'thip01',
    role: '작가',
    profileImage: '',
    points: 0,
    followers: '00명이 띱 하는 중',
  },
  {
    id: '5',
    nickname: 'thip01',
    role: '작가',
    profileImage: '',
    points: 0,
    followers: '00명이 띱 하는 중',
  },
  {
    id: '6',
    nickname: 'thip01',
    role: '작가',
    profileImage: '',
    points: 0,
    followers: '00명이 띱 하는 중',
  },
  {
    id: '7',
    nickname: 'thip01',
    role: '작가',
    profileImage: '',
    points: 0,
    followers: '00명이 띱 하는 중',
  },
];
