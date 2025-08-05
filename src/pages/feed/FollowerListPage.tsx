import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '../../assets/common/leftArrow.svg';
import UserProfileItem from '@/components/feed/UserProfileItem';
import type { UserProfileType } from '@/types/user';
import { getFollowerList } from '@/api/users/getFollowerList';
import { getFollowingList } from '@/api/users/getFollowingList';
import type { FollowData } from '@/types/follow';

interface FollowerListPageProps {
  userId?: string; // 띱 목록일때 필요
}

const FollowerListPage = ({ userId }: FollowerListPageProps) => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: UserProfileType }>();
  const title = type === 'followerlist' ? '띱 목록' : '내 띱 목록';

  // 상태 관리
  const [userList, setUserList] = useState<FollowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>('');
  const [isLast, setIsLast] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handleBackClick = () => {
    navigate(-1);
  };

  // API 호출 함수
  const loadUserList = useCallback(
    async (cursor?: string) => {
      if (loading) return;

      try {
        setLoading(true);
        let response;

        if (type === 'followerlist') {
          // 띱 목록 API 호출
          if (!userId) {
            console.error('userId가 없습니다.');
            return;
          }
          response = await getFollowerList(userId, { size: 10, cursor: cursor || null });
        } else {
          // 내 띱 목록 API 호출
          response = await getFollowingList({ size: 10, cursor: cursor || null });
        }

        if (cursor) {
          // 다음 페이지 데이터 추가 (무한 스크롤)
          setUserList(prev => [...prev, ...response.followers]);
        } else {
          // 첫 페이지 데이터 설정
          setUserList(response.followers);
        }

        setNextCursor(response.nextCursor);
        setIsLast(response.isLast);
        setTotalCount(prev => prev + response.followers.length);
      } catch (error) {
        console.error('사용자 목록 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    },
    [type, userId, loading],
  );

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      if (loading || isLast) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadUserList(nextCursor);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, isLast, nextCursor, loadUserList]);

  // 초기 데이터 로드
  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  return (
    <Wrapper>
      <TitleHeader leftIcon={<img src={leftArrow} />} onLeftClick={handleBackClick} title={title} />
      <TotalBar>전체 {totalCount}</TotalBar>
      <UserProfileList>
        {userList.map((user, index) => (
          <UserProfileItem
            key={user.userId}
            profileImgUrl={user.profileImageUrl}
            userName={user.nickname}
            userTitle={user.aliasName}
            titleColor={user.aliasColor}
            followerCount={user.followerCount}
            userId={user.userId}
            type={type as UserProfileType}
            isLast={index === userList.length - 1}
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
