export interface PostData {
  profileImgUrl: string;
  userName: string;
  userTitle: string;
  titleColor: string;
  createdAt: string;
  bookTitle: string;
  bookAuthor: string;
  postContent: string;
  postId: string;
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

// 대댓글(SubReply)
export interface SubReplyDataProps {
  replyCommentId: number;
  profileImgUrl: string;
  userName: string;
  userTitle: string;
  titleColor: string;
  createdAt: string;
  subreplyContent: string;
  initialLikeCount: number;
}

// 댓글(Reply)
export interface ReplyDataProps {
  commentId: number;
  profileImgUrl: string;
  userName: string;
  userTitle: string;
  titleColor: string;
  createdAt: string;
  replyContent: string;
  initialLikeCount: number;
  replyCommentList: SubReplyDataProps[];
}

// ReplyList Props
export interface ReplyListProps {
  commentList: ReplyDataProps[];
}
