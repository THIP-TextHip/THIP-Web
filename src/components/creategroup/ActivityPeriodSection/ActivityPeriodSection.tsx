import { useEffect, useMemo } from 'react';
import { Section, SectionTitle } from '../../../pages/group/CommonSection.styled';
import DateWheel from './DateWheel';
import {
  DatePickerContainer,
  DateRangeContainer,
  DateGroup,
  DateUnitText,
  SeparatorText,
  InfoText,
  ErrorText,
} from './ActivityPeriodSection.styled';

interface ActivityPeriodSectionProps {
  startDate: { year: number; month: number; day: number };
  endDate: { year: number; month: number; day: number };
  onStartDateChange: (date: { year: number; month: number; day: number }) => void;
  onEndDateChange: (date: { year: number; month: number; day: number }) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const ActivityPeriodSection = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onValidationChange,
}: ActivityPeriodSectionProps) => {
  // 현재 년도와 다음 년도
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];

  // 월 배열 (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 일 배열 계산 (선택된 년/월에 따라 동적으로 변경)
  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const startDays = getDaysInMonth(startDate.year, startDate.month);
  const endDays = getDaysInMonth(endDate.year, endDate.month);

  // 날짜 간 일수 계산
  const calculateDaysDifference = (start: Date, end: Date): number => {
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1은 시작일 포함
  };

  // 현재 선택된 날짜들로 일수 계산
  const daysDifference = useMemo(() => {
    const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);
    const endDateObj = new Date(endDate.year, endDate.month - 1, endDate.day);
    return calculateDaysDifference(startDateObj, endDateObj);
  }, [startDate, endDate]);

  // 90일 초과 여부 확인
  const isOverMaxDays = daysDifference > 90;

  // 종료일이 시작일보다 빠른지 확인 (추가)
  const isEndDateBeforeStart = useMemo(() => {
    const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);
    const endDateObj = new Date(endDate.year, endDate.month - 1, endDate.day);
    return endDateObj < startDateObj;
  }, [startDate, endDate]);

  // 날짜 유효성 검사 결과
  const isDateValid = !isOverMaxDays && !isEndDateBeforeStart;

  // 유효성 변경 시 부모에게 알림
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isDateValid);
    }
  }, [isDateValid, onValidationChange]);

  // 오늘 날짜로 초기값 설정
  const getInitialDate = () => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  };

  const getInitialEndDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return {
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth() + 1,
      day: tomorrow.getDate(),
    };
  };

  // 날짜 유효성 검사 및 조정
  const validateAndAdjustDate = (
    date: { year: number; month: number; day: number },
    isEndDate = false,
  ) => {
    const today = new Date();
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    const daysInSelectedMonth = new Date(date.year, date.month, 0).getDate();

    let adjustedDate = { ...date };

    // 일수가 해당 월의 최대 일수를 초과하는 경우 조정
    if (date.day > daysInSelectedMonth) {
      adjustedDate.day = daysInSelectedMonth;
    }

    // 시작일이 오늘보다 이른 경우 조정
    if (!isEndDate && selectedDate < today) {
      adjustedDate = getInitialDate();
    }

    // 종료일 검증
    if (isEndDate) {
      const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // 종료일이 내일보다 이르거나 시작일보다 이른 경우 조정
      if (selectedDate < tomorrow || selectedDate < startDateObj) {
        adjustedDate = getInitialEndDate();
      }
    }

    return adjustedDate;
  };

  // 시작일 변경 핸들러
  const handleStartYearChange = (year: number) => {
    const newDate = validateAndAdjustDate({ ...startDate, year });
    onStartDateChange(newDate);

    // 종료일도 재검증
    const adjustedEndDate = validateAndAdjustDate(endDate, true);
    if (JSON.stringify(adjustedEndDate) !== JSON.stringify(endDate)) {
      onEndDateChange(adjustedEndDate);
    }
  };

  const handleStartMonthChange = (month: number) => {
    const newDate = validateAndAdjustDate({ ...startDate, month });
    onStartDateChange(newDate);

    // 종료일도 재검증
    const adjustedEndDate = validateAndAdjustDate(endDate, true);
    if (JSON.stringify(adjustedEndDate) !== JSON.stringify(endDate)) {
      onEndDateChange(adjustedEndDate);
    }
  };

  const handleStartDayChange = (day: number) => {
    const newDate = validateAndAdjustDate({ ...startDate, day });
    onStartDateChange(newDate);

    // 종료일도 재검증
    const adjustedEndDate = validateAndAdjustDate(endDate, true);
    if (JSON.stringify(adjustedEndDate) !== JSON.stringify(endDate)) {
      onEndDateChange(adjustedEndDate);
    }
  };

  // 종료일 변경 핸들러
  const handleEndYearChange = (year: number) => {
    const newDate = validateAndAdjustDate({ ...endDate, year }, true);
    onEndDateChange(newDate);
  };

  const handleEndMonthChange = (month: number) => {
    const newDate = validateAndAdjustDate({ ...endDate, month }, true);
    onEndDateChange(newDate);
  };

  const handleEndDayChange = (day: number) => {
    const newDate = validateAndAdjustDate({ ...endDate, day }, true);
    onEndDateChange(newDate);
  };

  // 컴포넌트 마운트 시 초기 날짜 유효성 검사
  useEffect(() => {
    const validatedStartDate = validateAndAdjustDate(startDate);
    const validatedEndDate = validateAndAdjustDate(endDate, true);

    if (JSON.stringify(validatedStartDate) !== JSON.stringify(startDate)) {
      onStartDateChange(validatedStartDate);
    }

    if (JSON.stringify(validatedEndDate) !== JSON.stringify(endDate)) {
      onEndDateChange(validatedEndDate);
    }
  }, []);

  return (
    <Section>
      <SectionTitle>모임 활동기간</SectionTitle>
      <DatePickerContainer>
        <DateRangeContainer>
          {/* 시작일 */}
          <DateGroup alignItems="end">
            <DateWheel
              values={years}
              selectedValue={startDate.year}
              onChange={handleStartYearChange}
              width={44}
            />
            <DateUnitText>년</DateUnitText>

            <DateWheel
              values={months}
              selectedValue={startDate.month}
              onChange={handleStartMonthChange}
              width={24}
            />
            <DateUnitText>월</DateUnitText>

            <DateWheel
              values={startDays}
              selectedValue={startDate.day}
              onChange={handleStartDayChange}
              width={24}
            />
            <DateUnitText isLast>일</DateUnitText>
          </DateGroup>

          <SeparatorText>~</SeparatorText>

          {/* 종료일 */}
          <DateGroup alignItems="start">
            <DateWheel
              values={years}
              selectedValue={endDate.year}
              onChange={handleEndYearChange}
              width={44}
            />
            <DateUnitText>년</DateUnitText>

            <DateWheel
              values={months}
              selectedValue={endDate.month}
              onChange={handleEndMonthChange}
              width={24}
            />
            <DateUnitText>월</DateUnitText>

            <DateWheel
              values={endDays}
              selectedValue={endDate.day}
              onChange={handleEndDayChange}
              width={24}
            />
            <DateUnitText isLast>일</DateUnitText>
          </DateGroup>
        </DateRangeContainer>

        {isEndDateBeforeStart ? (
          <ErrorText>종료일은 시작일보다 빠를 수 없어요.</ErrorText>
        ) : isOverMaxDays ? (
          <ErrorText>모임 활동기간은 최대 3개월까지 설정가능합니다.</ErrorText>
        ) : (
          <InfoText>모임방 활동이 시작되면, 독서메이트 모집이 자동으로 종료돼요.</InfoText>
        )}
      </DatePickerContainer>
    </Section>
  );
};

export default ActivityPeriodSection;
