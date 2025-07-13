import type { Message } from './types';

export const dummyMessages: Message[] = [
  {
    id: '1',
    user: 'user.01',
    content:
      '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.30',
    timeAgo: '11시간 전',
    createdAt: new Date('2024-04-30T13:00:00'),
  },
  {
    id: '2',
    user: 'user.01',
    content:
      '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.30',
    timeAgo: '11시간 전',
    createdAt: new Date('2024-04-30T14:00:00'),
  },
  {
    id: '3',
    user: 'user.01',
    content: '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.30',
    timeAgo: '12시간 전',
    createdAt: new Date('2024-04-30T12:00:00'),
  },
  {
    id: '4',
    user: 'user.01',
    content:
      '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.29',
    timeAgo: '11시간 전',
    createdAt: new Date('2024-04-29T15:00:00'),
  },
  {
    id: '5',
    user: 'user.05',
    content:
      '공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다. 공백 포함 글자 입력입니다.',
    timestamp: '2024.04.29',
    timeAgo: '10시간 전',
    createdAt: new Date('2024-04-29T16:00:00'),
  },
];
