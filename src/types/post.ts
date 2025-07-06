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
}

export interface FeedListProps {
  showHeader: boolean;
  posts: PostData[];
}

export interface FeedPostProps extends PostData {
  showHeader: boolean;
}
