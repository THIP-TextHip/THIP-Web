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
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const startDays = getDaysInMonth(startDate.year, startDate.month);
  const endDays = getDaysInMonth(endDate.year, endDate.month);

  const calculateDaysDifference = (start: Date, end: Date): number => {
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  const daysDifference = useMemo(() => {
    const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);
    const endDateObj = new Date(endDate.year, endDate.month - 1, endDate.day);
    return calculateDaysDifference(startDateObj, endDateObj);
  }, [startDate, endDate]);

  const isOverMaxDays = daysDifference > 90;

  const isEndDateBeforeStart = useMemo(() => {
    const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);
    const endDateObj = new Date(endDate.year, endDate.month - 1, endDate.day);
    return endDateObj < startDateObj;
  }, [startDate, endDate]);

  const isDateValid = !isOverMaxDays && !isEndDateBeforeStart;

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isDateValid);
    }
  }, [isDateValid, onValidationChange]);

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

  const validateAndAdjustDate = (
    date: { year: number; month: number; day: number },
    isEndDate = false,
  ) => {
    const today = new Date();
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    const daysInSelectedMonth = new Date(date.year, date.month, 0).getDate();

    let adjustedDate = { ...date };

    if (date.day > daysInSelectedMonth) {
      adjustedDate.day = daysInSelectedMonth;
    }

    if (!isEndDate && selectedDate < today) {
      adjustedDate = getInitialDate();
    }

    if (isEndDate) {
      const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (selectedDate < tomorrow || selectedDate < startDateObj) {
        adjustedDate = getInitialEndDate();
      }
    }

    return adjustedDate;
  };

  const handleStartYearChange = (year: number) => {
    const newDate = validateAndAdjustDate({ ...startDate, year });
    onStartDateChange(newDate);

    const adjustedEndDate = validateAndAdjustDate(endDate, true);
    if (JSON.stringify(adjustedEndDate) !== JSON.stringify(endDate)) {
      onEndDateChange(adjustedEndDate);
    }
  };

  const handleStartMonthChange = (month: number) => {
    const newDate = validateAndAdjustDate({ ...startDate, month });
    onStartDateChange(newDate);

    const adjustedEndDate = validateAndAdjustDate(endDate, true);
    if (JSON.stringify(adjustedEndDate) !== JSON.stringify(endDate)) {
      onEndDateChange(adjustedEndDate);
    }
  };

  const handleStartDayChange = (day: number) => {
    const newDate = validateAndAdjustDate({ ...startDate, day });
    onStartDateChange(newDate);

    const adjustedEndDate = validateAndAdjustDate(endDate, true);
    if (JSON.stringify(adjustedEndDate) !== JSON.stringify(endDate)) {
      onEndDateChange(adjustedEndDate);
    }
  };

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
