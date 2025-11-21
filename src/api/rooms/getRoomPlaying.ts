import { apiClient } from '../index';
import { AxiosError } from 'axios';

export interface VoteItem {
  itemName: string;
}

export interface CurrentVote {
  content: string;
  page: number;
  isOverview: boolean;
  voteItems: VoteItem[];
}

export interface RoomPlayingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    isHost: boolean;
    roomId: number;
    roomName: string;
    roomImageUrl: string;
    isPublic: boolean;
    progressStartDate: string;
    progressEndDate: string;
    category: string;
    categoryColor: string;
    roomDescription: string;
    memberCount: number;
    recruitCount: number;
    isbn: string;
    bookTitle: string;
    authorName: string;
    currentPage: number;
    userPercentage: number;
    currentVotes: CurrentVote[];
  };
}

export interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  pageNumber: number;
}

export const convertVotesToPolls = (currentVotes: CurrentVote[]): Poll[] => {
  return currentVotes.map((vote, index) => ({
    id: index.toString(),
    question: vote.content,
    options: vote.voteItems.map((item, itemIndex) => ({
      id: itemIndex.toString(),
      text: item.itemName,
    })),
    pageNumber: vote.page,
  }));
};

export const getRoomPlaying = async (roomId: number): Promise<RoomPlayingResponse> => {
  try {
    const response = await apiClient.get<RoomPlayingResponse>(`/rooms/${roomId}`);
    return response.data;
  } catch (error: unknown) {
    console.error('진행중인 방 상세 정보 조회 API 오류:', error);

    if (error instanceof AxiosError && error.response?.data?.code === 140011) {
      throw new Error('방 접근 권한이 없습니다.');
    }

    throw error;
  }
};
