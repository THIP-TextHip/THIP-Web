import { apiClient } from '../index';

export interface SearchRoomItem {
  roomId: number;
  bookImageUrl: string;
  roomName: string;
  memberCount: number;
  recruitCount: number;
  deadlineDate: string;
  isPublic: boolean;
  isFinalized?: boolean;
  genre?: string;
}

export interface SearchRoomsResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    roomList: SearchRoomItem[];
    nextCursor: string | null;
    isLast: boolean;
  };
}

export const getSearchRooms = async (
  keyword: string,
  sort: 'deadline' | 'memberCount',
  cursor?: string,
  isFinalized: boolean = false,
  category: string = '',
  isAllCategory: boolean = false,
): Promise<SearchRoomsResponse> => {
  try {
    const params = new URLSearchParams();
    if (!isAllCategory && keyword) {
      params.append('keyword', keyword);
    }
    params.append('sort', sort);
    params.append('isFinalized', String(isFinalized));
    if (cursor) params.append('cursor', cursor);
    if (category) params.append('category', category);
    if (isAllCategory) params.append('isAllCategory', 'true');

    const url = `/rooms/search?${params.toString()}`;
    const response = await apiClient.get<SearchRoomsResponse>(url);
    return response.data;
  } catch (error) {
    console.error('방 검색 API 오류:', error);
    throw error;
  }
};
