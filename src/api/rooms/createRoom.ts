import { apiClient } from '../index';
import type { CreateRoomRequest, CreateRoomData, ApiResponse } from '@/types/room';

// API 응답 타입
export type CreateRoomResponse = ApiResponse<CreateRoomData>;

// 방 생성 API 함수
export const createRoom = async (roomData: CreateRoomRequest) => {
  const response = await apiClient.post<CreateRoomResponse>('/rooms', roomData);
  return response.data;
};

/*
사용 예시:
const roomData: CreateRoomRequest = {
  isbn: "9788936434632",
  category: "문학",
  roomName: "문학 모임",
  description: "문학을 사랑하는 사람들의 모임입니다.",
  progressStartDate: "2023.10.01",
  progressEndDate: "2023.10.31",
  recruitCount: 5,
  password: "1234",
  isPublic: true
};

try {
  const result = await createRoom(roomData);
  if (result.isSuccess) {
    console.log("생성된 방 ID:", result.data.roomId);
    // 성공 처리 로직
  } else {
    console.error("방 생성 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/
