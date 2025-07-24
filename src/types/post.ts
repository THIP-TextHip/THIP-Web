export interface PostData {
  profileImgUrl: string;
  userName: string;
  userId: number;
  userTitle: string;
  titleColor: string;
  createdAt: string;
  bookTitle: string;
  isbn: number;
  bookAuthor: string;
  postContent: string;
  feedId: number;
  initialLikeCount: number;
  commentCount: number;
  images?: string[];
  tags?: string[];
  isPublic?: boolean;
}

export interface FeedListProps {
  showHeader: boolean;
  posts: PostData[];
  isMyFeed?: boolean;
}

export interface FeedPostProps extends PostData {
  showHeader: boolean;
  isMyFeed?: boolean;
}

export type PostBodyProps = Pick<
  PostData,
  'bookTitle' | 'bookAuthor' | 'postContent' | 'feedId' | 'images' | 'tags' | 'isbn'
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
