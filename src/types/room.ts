export interface Room {
  roomId: number;
  roomName: string;
  description: string;
  category: string;
  isbn: string;
  bookTitle?: string;
  bookAuthor?: string;
  bookCoverUrl?: string;
  progressStartDate: string;
  progressEndDate: string;
  recruitCount: number;
  currentMemberCount: number;
  isPublic: boolean;
  hasPassword: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomRequest {
  isbn: string;
  category: string;
  roomName: string;
  description: string;
  progressStartDate: string;
  progressEndDate: string;
  recruitCount: number;
  password: string | null;
  isPublic: boolean;
}

export interface CreateRoomData {
  roomId: number;
}

export interface RoomListData {
  rooms: Room[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface RoomDetailData extends Room {
  members: RoomMember[];
  isOwner: boolean;
  isMember: boolean;
}

export interface RoomMember {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  joinedAt: string;
  isOwner: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}
