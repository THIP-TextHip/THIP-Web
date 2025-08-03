import { Section, SectionTitle } from '../../pages/group/CommonSection.styled';
import DateWheel from './ActivityPeriodSection/DateWheel';
import {
  MemberLimitContainer,
  MemberWheelContainer,
  MemberText,
} from './MemberLimitSection.styled';

interface MemberLimitSectionProps {
  memberLimit: number;
  onMemberLimitChange: (limit: number) => void;
}

const MemberLimitSection = ({ memberLimit, onMemberLimitChange }: MemberLimitSectionProps) => {
  // 1부터 30까지의 배열 생성
  const memberNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Section>
      <SectionTitle>인원 제한</SectionTitle>
      <MemberLimitContainer>
        <MemberWheelContainer>
          <DateWheel
            values={memberNumbers}
            selectedValue={memberLimit}
            onChange={onMemberLimitChange}
            width={24}
          />
          <MemberText>명의 독서메이트를 모집합니다.</MemberText>
        </MemberWheelContainer>
      </MemberLimitContainer>
    </Section>
  );
};

export default MemberLimitSection;
