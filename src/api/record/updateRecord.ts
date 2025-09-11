import { apiClient } from '../index';
import type { UpdateRecordRequest, UpdateRecordData, ApiResponse } from '@/types/record';

// API 응답 타입
export type UpdateRecordResponse = ApiResponse<UpdateRecordData>;

// 기록 수정 API 함수
export const updateRecord = async (
  roomId: number,
  recordId: number,
  recordData: UpdateRecordRequest,
): Promise<UpdateRecordResponse> => {
  try {
    const response = await apiClient.patch<UpdateRecordResponse>(
      `/rooms/${roomId}/records/${recordId}`,
      recordData,
    );
    return response.data;
  } catch (error) {
    console.error('기록 수정 API 오류:', error);
    throw error;
  }
};

/*
사용 예시:
const recordData: UpdateRecordRequest = {
  content: "수정된 기록 내용입니다~~"
};

try {
  const result = await updateRecord(1, 123, recordData);
  if (result.isSuccess) {
    console.log("수정된 방 ID:", result.data.roomId);
    // 성공 처리 로직
  } else {
    console.error("기록 수정 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/