// data/postData.ts
import type { FeedPostProps, ReplyDataProps } from '@/types/post';

// 📌 게시글(Mock)
export const mockFeedPost: FeedPostProps = {
  profileImgUrl: 'https://placehold.co/54x54',
  userName: '문학하는 고래',
  userTitle: '문학가',
  titleColor: '#a1d5ff',
  createdAt: '2025.01.12',
  bookTitle: '채식주의자',
  bookAuthor: '한강',
  postContent:
    '정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.정말 인상 깊게 읽은 책이에요.',
  postId: '1',
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
    userTitle: '작가',
    titleColor: '#A1D5FF',
    createdAt: '12시간 전',
    replyContent: '저도 읽어보고 싶네요!',
    initialLikeCount: 3,
    replyCommentList: [],
  },
];
