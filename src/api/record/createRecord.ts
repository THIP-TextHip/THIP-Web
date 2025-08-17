import { apiClient } from '../index';
import type { CreateRecordRequest, CreateRecordData, ApiResponse } from '@/types/record';

// API 응답 타입
export type CreateRecordResponse = ApiResponse<CreateRecordData>;

// 기록 생성 API 함수
export const createRecord = async (roomId: number, recordData: CreateRecordRequest) => {
  const response = await apiClient.post<CreateRecordResponse>(
    `/rooms/${roomId}/record`,
    recordData,
  );
  return response.data;
};

/*
사용 예시:
const recordData: CreateRecordRequest = {
  page: 20,
  isOverview: false,
  content: "맘은 최고의 새버린다."
};

try {
  const result = await createRecord(1, recordData);
  if (result.isSuccess) {
    console.log("생성된 기록 ID:", result.data.recordId);
    console.log("방 ID:", result.data.roomId);
    // 성공 처리 로직
  } else {
    console.error("기록 생성 실패:", result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error("API 호출 오류:", error);
  // 에러 처리 로직
}
*/
