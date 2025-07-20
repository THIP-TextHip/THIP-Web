import TitleHeader from '@/components/common/TitleHeader';
import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '@/components/common/Wrapper';

const ApplyBook = () => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      <TitleHeader
        title="책 신청"
        leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
        onLeftClick={handleBackButton}
      />
      <TextWrapper>
        <MainText>texthip2025@gmail.com</MainText>
        <SubText>이메일로 책 제목, 출판사를 보내주시면</SubText>
        <SubText>빠른 시일내로 책을 추가해드릴게요!</SubText>
      </TextWrapper>
    </Wrapper>
  );
};

export default ApplyBook;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const MainText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 12px;
`;

const SubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  margin-bottom: 6px;
`;
