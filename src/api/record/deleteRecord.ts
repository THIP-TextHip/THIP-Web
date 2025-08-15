import { apiClient } from '../index';
import type { ApiResponse } from '@/types/record';

// 기록 삭제 응답 데이터 타입
export interface DeleteRecordData {
  roomId: number; // 삭제된 기록이 속한 방 ID
}

// API 응답 타입
export type DeleteRecordResponse = ApiResponse<DeleteRecordData>;

// 기록 삭제 API 함수
export const deleteRecord = async (
  roomId: number,
  recordId: number,
): Promise<DeleteRecordResponse> => {
  try {
    const response = await apiClient.delete<DeleteRecordResponse>(
      `/rooms/${roomId}/record/${recordId}`,
    );
    return response.data;
  } catch (error) {
    console.error('기록 삭제 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:
try {
  const result = await deleteRecord(1, 123);
  if (result.isSuccess) {
    console.log("기록 삭제 성공:", result.data.roomId);
    // 성공 처리 로직 (예: 목록에서 제거, 성공 메시지 표시)
  } else {
    console.error("기록 삭제 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/
