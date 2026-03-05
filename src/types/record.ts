export interface CreateRecordRequest {
  page: number;
  isOverview: boolean;
  content: string;
}
export interface CreateRecordData {
  recordId: number;
  roomId: number;
}

export interface VoteItem {
  itemName: string;
}

export interface CreateVoteRequest {
  page: number;
  isOverview: boolean;
  content: string;
  voteItemList: VoteItem[];
}

export interface CreateVoteData {
  voteId: number;
  roomId: number;
}

export interface VoteItemResult {
  voteItemId: number;
  itemName: string;
  percentage: number;
  count: number;
  isVoted: boolean;
}

export interface VoteRequest {
  voteItemId: number;
  type: boolean;
}

export interface VoteData {
  postId: number;
  roomId: number;
  voteItems: VoteItemResult[];
}

export interface UpdateRecordRequest {
  content: string;
}

export interface UpdateRecordData {
  roomId: number;
}

export interface UpdateVoteRequest {
  content: string;
}

export interface UpdateVoteData {
  roomId: number;
}

export interface CreateAiReviewData {
  content: string;
  count: number;
}

export interface AiUsageData {
  recordReviewCount: number;
  recordCount: number;
}
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}
