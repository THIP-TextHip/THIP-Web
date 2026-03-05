import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '@/components/common/Wrapper';
import { TextWrapper, MainText, SubText } from './ApplyBook.styled';

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
