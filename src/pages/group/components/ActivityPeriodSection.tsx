import { semanticColors, typography } from '../../../styles/global/global';
import { Section, SectionTitle } from '../CommonSection.styled';
import {
  DatePickerContainer,
  DatePickerRow,
  DateSelector,
  DateText,
} from './ActivityPeriodSection.styled';

interface ActivityPeriodSectionProps {
  startDate: { year: number; month: number; day: number };
  endDate: { year: number; month: number; day: number };
}

const ActivityPeriodSection = ({ startDate, endDate }: ActivityPeriodSectionProps) => {
  return (
    <Section>
      <SectionTitle>모임 활동기간</SectionTitle>
      <DatePickerContainer>
        <DatePickerRow>
          <DateSelector>
            <DateText>{startDate.year}</DateText>
            <DateText>년</DateText>
            <DateText>{startDate.month}</DateText>
            <DateText>월</DateText>
            <DateText>{startDate.day}</DateText>
            <DateText>일</DateText>
            <DateText>-</DateText>
            <DateText>{endDate.year}</DateText>
            <DateText>년</DateText>
            <DateText>{endDate.month}</DateText>
            <DateText>월</DateText>
            <DateText>{endDate.day}</DateText>
            <DateText>일</DateText>
          </DateSelector>
        </DatePickerRow>
        <DateText
          style={{
            marginTop: '12px',
            fontSize: typography.fontSize.xs,
            color: semanticColors.text.point.green,
          }}
        >
          모임 활동기간은 최대 3개월까지 설정가능합니다.
        </DateText>
      </DatePickerContainer>
    </Section>
  );
};

export default ActivityPeriodSection;
