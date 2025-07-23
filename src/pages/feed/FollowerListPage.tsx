import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import UserProfileItem from '@/components/feed/UserProfileItem';
import { mockUserList } from '@/data/userData';
import type { UserProfileType } from '@/types/user';

const FollowerListPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: UserProfileType }>();
  const title = type === 'followerlist' ? '띱 목록' : '내 띱 목록';
  const handleBackClick = () => {
    navigate(-1);
  };
  const totalCount = mockUserList.length;

  return (
    <Wrapper>
      <TitleHeader leftIcon={<img src={leftArrow} />} onLeftClick={handleBackClick} title={title} />
      <TotalBar>전체 {totalCount}</TotalBar>
      <UserProfileList>
        {mockUserList.map((user, index) => (
          <UserProfileItem
            key={index}
            {...user}
            type={type as UserProfileType}
            isLast={index === mockUserList.length - 1}
          />
        ))}
      </UserProfileList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  margin: 0 auto;
  background-color: var(--color-black-main);
`;

const TotalBar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  padding-top: 76px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--color-darkgrey-dark);
  background-color: var(--color-black-main);

  color: var(--color-grey-100);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 24px;
`;

const UserProfileList = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 320px;
  max-width: 540px;
  padding-top: 105px;
  padding-bottom: 20px;
`;

export default FollowerListPage;
