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
  isMyFeed: boolean;
}

export interface FeedPostProps extends PostData {
  showHeader: boolean;
  isMyFeed: boolean;
}
