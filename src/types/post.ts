export interface PostData {
  feedId: number;
  creatorId?: number;
  creatorNickname?: string;
  creatorProfileImageUrl?: string;
  alias?: string;
  postDate: string;
  isbn: string;
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
  isTotalFeed?: boolean;
  isLast?: boolean;
}

export interface FeedPostProps extends PostData {
  showHeader?: boolean;
  isMyFeed?: boolean;
  isTotalFeed?: boolean;
  isLast?: boolean;
}

export type PostBodyProps = Pick<
  PostData,
  'bookTitle' | 'bookAuthor' | 'contentBody' | 'feedId' | 'contentsUrl' | 'isbn'
>;

// 대댓글(SubReply)
export interface SubReplyDataProps {
  parentCommentCreatorNickname: string;
  creatorId: number;
  creatorProfileImageUrl: string | null;
  creatorNickname: string;
  alias: string;
  aliasColor: string;
  postDate: string;
  content: string;
  likeCount: number;
  replyId: number;
  isLike: boolean;
}

// 댓글(Reply)
export interface ReplyDataProps {
  commentId: number;
  creatorId: number;
  creatorProfileImageUrl: string | null;
  creatorNickname: string;
  alias: string;
  aliasColor: string;
  postDate: string;
  content: string;
  likeCount: number;
  isLike: boolean;
  isDeleted: boolean;
  replyList: SubReplyDataProps[];
}

// ReplyList Props
export interface ReplyListProps {
  commentList: ReplyDataProps[];
}
