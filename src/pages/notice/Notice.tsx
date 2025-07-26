import TitleHeader from '@/components/common/TitleHeader';
import { Wrapper } from '../searchBook/SearchBook.styled';
import leftArrow from '../../assets/common/leftArrow.svg';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  const handleBackButton = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  return (
    <Wrapper>
      <TitleHeader
        title="책 신청"
        leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
        onLeftClick={handleBackButton}
      />
    </Wrapper>
  );
};

export default Notice;
