/**
 * 모임방 상태 관련 유틸리티 함수들
 */

/**
 * 모임방이 완료되었는지 확인하는 함수
 * @param progressEndDate 활동 종료 날짜 (YYYY-MM-DD 또는 YYYY.MM.DD 형식)
 * @returns 활동 기간이 종료되었으면 true, 아니면 false
 */
export const isRoomCompleted = (progressEndDate: string): boolean => {
  if (!progressEndDate) return false;

  // 날짜 형식 정규화 (YYYY.MM.DD -> YYYY-MM-DD)
  const normalizedDate = progressEndDate.replace(/\./g, '-');

  const endDate = new Date(normalizedDate);
  const today = new Date();

  // 시간 부분을 제거하고 날짜만 비교
  today.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return today > endDate;
};
