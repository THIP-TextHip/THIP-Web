import { useNavigate } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import MemberList from '../../components/members/MemberList';
import leftArrow from '../../assets/common/leftArrow.svg';
import { mockMembers } from '../../mocks/members.mock';
import { Wrapper } from './GroupMembers.styled';

const GroupMembers = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMemberClick = (memberId: string) => {
    // 특정 사용자 페이지로 이동
    navigate(`/user/${memberId}`);
  };

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        title="독서메이트"
        onLeftClick={handleBackClick}
      />
      <Wrapper>
        <MemberList members={mockMembers} onMemberClick={handleMemberClick} />
      </Wrapper>
    </>
  );
};

export default GroupMembers;
