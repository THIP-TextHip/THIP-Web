// data/postData.ts
import type { FeedPostProps, ReplyDataProps, PostData } from '@/types/post';

export const mockPosts: PostData[] = [
  {
    profileImgUrl: 'https://placehold.co/24x24',
    userName: 'userName',
    userTitle: 'userTitle',
    userId: 125,
    titleColor: '#FF8BAC',
    createdAt: '12시간 전',
    bookTitle: '제목입니다',
    bookAuthor: '작가입니다',
    isbn: 111155544,
    postContent: '내용입니다…',
    feedId: 55,
    initialLikeCount: 125,
    commentCount: 125,
    images: ['https://placehold.co/100x100', 'https://placehold.co/100x100'],
    isPublic: true,
  },
  {
    profileImgUrl: 'https://placehold.co/24x24',
    userName: 'userName',
    userId: 177,
    userTitle: 'userTitle',
    titleColor: '#FF8BAC',
    createdAt: '12시간 전',
    bookTitle: '제목입니다제목입니다제목입니다',
    bookAuthor: '작가입니다',
    isbn: 111152544,
    postContent:
      '내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다',
    feedId: 56,
    initialLikeCount: 125,
    commentCount: 125,
    isPublic: false,
  },
  // …다른 포스트들…
];

// 📌 게시글(Mock)
export const mockFeedPost: FeedPostProps = {
  profileImgUrl: 'https://placehold.co/54x54',
  userName: '문학하는 고래',
  userId: 111,
  userTitle: '문학가',
  titleColor: '#a1d5ff',
  createdAt: '2025.01.12',
  bookTitle: '채식주의자',
  isbn: 111155546,
  bookAuthor: '한강',
  postContent:
    '정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.',
  feedId: 1,
  initialLikeCount: 15,
  commentCount: 2,
  showHeader: true,
  tags: ['소설', '베스트셀러', '한강'],
};

// 📌 댓글/대댓글(Mock)
export const mockCommentList: ReplyDataProps[] = [
  {
    commentId: 23,
    profileImgUrl: 'https://placehold.co/36x36',
    userName: 'User31',
    userId: 1,
    userTitle: '독서가',
    titleColor: '#FF8BAC',
    createdAt: '2025.01.12',
    replyContent:
      '이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!',
    initialLikeCount: 1,
    replyCommentList: [
      {
        replyCommentId: 1,
        profileImgUrl: 'https://placehold.co/36x36',
        userName: 'SubUser1',
        userId: 2,
        userTitle: '북러버',
        titleColor: '#A0F8E8',
        createdAt: '2025.01.13',
        subreplyContent:
          '맞아요, 저도 너무 좋았어요!맞아요, 저도 너무 좋았어요!맞아요, 저도 너무 좋았어요!맞아요, 저도 너무 좋았어요!',
        initialLikeCount: 2,
      },
      {
        replyCommentId: 2,
        profileImgUrl: 'https://placehold.co/36x36',
        userName: 'SubUser2',
        userId: 3,
        userTitle: '소설가',
        titleColor: '#A1D5FF',
        createdAt: '2025.01.14',
        subreplyContent: '추천 감사합니다!',
        initialLikeCount: 0,
      },
    ],
  },
  {
    commentId: 30,
    profileImgUrl: 'https://placehold.co/36x36',
    userName: 'User45',
    userId: 45,
    userTitle: '작가',
    titleColor: '#A1D5FF',
    createdAt: '12시간 전',
    replyContent: '저도 읽어보고 싶네요!',
    initialLikeCount: 3,
    replyCommentList: [],
  },
];
