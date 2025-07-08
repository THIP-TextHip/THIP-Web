import { semanticColors, typography } from '../../../styles/global/global';
import { Section, SectionTitle } from '../CommonSection.styled';
import { MemberLimitContainer, MemberNumber, MemberText } from './MemberLimitSection.styled';

interface MemberLimitSectionProps {
  memberLimit: number;
}

const MemberLimitSection = ({ memberLimit }: MemberLimitSectionProps) => {
  return (
    <Section>
      <SectionTitle>인원 제한</SectionTitle>
      <MemberLimitContainer>
        <MemberNumber>30</MemberNumber>
        <div>
          <MemberNumber style={{ fontSize: typography.fontSize.base }}>{memberLimit}</MemberNumber>
          <MemberText>명의 독서메이트를 모집합니다.</MemberText>
          <MemberNumber style={{ fontSize: typography.fontSize.base, marginLeft: '8px' }}>
            {memberLimit + 1}
          </MemberNumber>
        </div>
      </MemberLimitContainer>
      <MemberText
        style={{
          marginTop: '12px',
          fontSize: typography.fontSize.xs,
          color: semanticColors.text.point.green,
        }}
      >
        모임 인원은 최대 30명까지 신청받을 수 있습니다.
      </MemberText>
    </Section>
  );
};

export default MemberLimitSection;
