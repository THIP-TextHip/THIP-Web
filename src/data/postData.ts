import type { FeedPostProps, ReplyDataProps, PostData } from '@/types/post';
import test from '../assets/common/test.jpg';
import test2 from '../assets/common/test2.jpg';

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
  images: [test2, 'https://placehold.co/300x300', test],
  tags: ['소설', '베스트셀러', '한강'],
};

// 📌 댓글/대댓글(Mock)
export const mockCommentList: ReplyDataProps[] = [
  {
    commentId: 23,
    userId: 1,
    imageUrl: 'https://placehold.co/36x36',
    nickName: 'User31',
    userTitle: '독서가',
    titleColor: '#FF8BAC',
    createdAt: '2025.01.12',
    postDate: '2025.01.12',
    content:
      '이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!이 책 정말 좋죠!',
    likeCount: 1,
    isLike: false,
    replyCommentList: [
      {
        replyCommentId: 1,
        replyCommentUserId: 1234,
        replyCommentimgUrl: 'https://placehold.co/36x36',
        replyCommentUserName: 'SubUser1',
        replyCommentUserTitle: '북러버',
        postDate: '2025.01.13',
        titleColor: '#FFFF24',
        replyCommentContent: '맞아요, 저도 너무 좋았어요!맞아요, 저도 너무 좋았어요!',
        likeCount: 2,
        isLike: false,
      },
      {
        replyCommentId: 2,
        replyCommentimgUrl: 'https://placehold.co/36x36',
        replyCommentUserId: 222,
        replyCommentUserName: 'SubUser2',
        replyCommentUserTitle: '소설가',
        titleColor: '#FF8BAC',
        postDate: '2025.01.14',
        replyCommentContent: '추천 감사합니다!',
        likeCount: 123,
        isLike: true,
      },
    ],
  },
  {
    commentId: 30,
    userId: 45,
    imageUrl: 'https://placehold.co/36x36',
    nickName: 'User45',
    userTitle: '작가',
    titleColor: '#A1D5FF',
    createdAt: '12시간 전',
    postDate: '2025.01.14',
    content: '저도 읽어보고 싶네요!',
    likeCount: 3,
    isLike: true,
    replyCommentList: [],
  },
];
