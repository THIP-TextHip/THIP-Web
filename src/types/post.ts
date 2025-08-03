export interface PostData {
  feedId: number;
  creatorId?: number;
  creatorNickname?: string;
  creatorProfileImageUrl?: string;
  alias?: string;
  postDate: string;
  isbn: number;
  bookTitle: string;
  bookAuthor: string;
  contentBody: string;
  contentsUrl: string[];
  likeCount: number;
  commentCount: number;
  isSaved?: boolean;
  isLiked?: boolean;
  isPublic?: boolean;
}

export interface FeedListProps {
  showHeader: boolean;
  posts: PostData[];
  isMyFeed?: boolean;
}

export interface FeedPostProps extends PostData {
  showHeader?: boolean;
  isMyFeed?: boolean;
}

export type PostBodyProps = Pick<
  PostData,
  'bookTitle' | 'bookAuthor' | 'contentBody' | 'feedId' | 'contentsUrl' | 'isbn'
>;

// 대댓글(SubReply)
export interface SubReplyDataProps {
  replyCommentUserName: string;
  replyCommentUserId: number;
  replyCommentimgUrl: string;
  replyCommentContent: string;
  replyCommentUserTitle: string;
  replyCommentId: number;
  titleColor: string;
  postDate: string;
  likeCount: number;
  isLike: boolean;
}

// 댓글(Reply)
export interface ReplyDataProps {
  commentId: number;
  userId: number;
  imageUrl: string;
  nickName: string;
  userTitle: string;
  titleColor: string;
  createdAt: string;
  postDate: string;
  content: string;
  likeCount: number;
  isLike: boolean;
  replyCommentList: SubReplyDataProps[];
}

// ReplyList Props
export interface ReplyListProps {
  commentList: ReplyDataProps[];
}
