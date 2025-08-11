// Room 관련 공통 타입 정의
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

// 방 생성 요청 데이터 타입
export interface CreateRoomRequest {
  isbn: string;
  category: string;
  roomName: string;
  description: string;
  progressStartDate: string; // YYYY.MM.DD 형식
  progressEndDate: string; // YYYY.MM.DD 형식
  recruitCount: number;
  password: string | null; // 비공개방: 4자리 숫자, 공개방: null
  isPublic: boolean;
}

// 방 생성 응답 데이터 타입
export interface CreateRoomData {
  roomId: number;
}

// 방 목록 조회 응답 타입
export interface RoomListData {
  rooms: Room[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

// 방 상세 조회 응답 타입
export interface RoomDetailData extends Room {
  members: RoomMember[];
  isOwner: boolean;
  isMember: boolean;
}

// 방 멤버 타입
export interface RoomMember {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  joinedAt: string;
  isOwner: boolean;
}

// 공통 API 응답 타입
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
}
