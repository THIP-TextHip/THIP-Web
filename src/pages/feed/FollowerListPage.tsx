import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import UserProfileItem from '@/components/feed/UserProfileItem';
import type { UserProfileItemProps } from '@/components/feed/UserProfileItem';

const mockUserList: UserProfileItemProps[] = [
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: 'ThipOther',
    userTitle: '칭호칭호',
    titleColor: '#FF8BAC',
    followerCount: 15,
    userId: 1,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: '하위',
    userTitle: '칭호칭호',
    titleColor: '#FF8BAC',
    followerCount: 15,
    userId: 1,
    isFollowed: true,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: '책읽으러왔음',
    userTitle: '공식 인플루언서',
    titleColor: '#A0F8E8',
    userId: 2,
    isFollowed: false,
  },
  {
    profileImgUrl: 'https://placehold.co/36x36',
    userName: 'thip01',
    userTitle: '작가',
    titleColor: '#A0F8E8',
    followerCount: 7,
    userId: 3,
  },
];

const FollowerListPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const totalCount = mockUserList.length;

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} />}
        onLeftClick={handleBackClick}
        title="내 구독 리스트"
      />
      <TotalBar>전체 {totalCount}</TotalBar>
      <UserProfileList>
        {mockUserList.map((user, index) => (
          <UserProfileItem key={index} {...user} />
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
