import { apiClient } from '@/api/index';

export type FeedSort = 'like' | 'latest';

export interface FeedItem {
  feedId: number;
  creatorId: number;
  isWriter: boolean;
  creatorNickname: string;
  creatorProfileImageUrl: string;
  aliasName: string;
  aliasColor: string;
  postDate: string;
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  contentBody: string;
  contentUrls: string[];
  likeCount: number;
  commentCount: number;
  isSaved: boolean;
  isLiked: boolean;
}

export interface GetFeedsByIsbnResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    feeds: FeedItem[];
    nextCursor: string | null;
    isLast: boolean;
  };
}

export const getFeedsByIsbn = async (
  isbn: string,
  sort: FeedSort = 'like',
  cursor?: string | null,
): Promise<GetFeedsByIsbnResponse> => {
  const params = new URLSearchParams();
  params.set('sort', sort);
  if (cursor != null) params.set('cursor', cursor);

  const url = `/feeds/related-books/${encodeURIComponent(isbn)}?` + params.toString();
  const res = await apiClient.get<GetFeedsByIsbnResponse>(url);
  return res.data;
};
