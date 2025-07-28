import { Wrapper } from '../common/Wrapper';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import toggle from '../../assets/mypage/toggle.svg';
import toggleActive from '../../assets/mypage/toggle-active.svg';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

const AlertPage = () => {
  const navigate = useNavigate();

  const onLeftClick = () => {
    navigate('/mypage');
  };

  return (
    <Wrapper>
      <TitleHeader
        title="알림설정"
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={onLeftClick}
      />
      <Section>
        <SectionTitle>푸시알림</SectionTitle>
        <SectionContent>
          <div>알림센터의 모든 알림을 포함해요</div>
          <img src={toggle} alt="토글" />
        </SectionContent>
      </Section>
    </Wrapper>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  gap: 13px;
  padding: 32px 20px;
`;

const SectionTitle = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

const SectionContent = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 24px;
`;

export default AlertPage;
