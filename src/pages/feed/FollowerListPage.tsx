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

const FollowerListPage = () => {
  const navigate = useNavigate();
  const { type, userId } = useParams<{ type: UserProfileType; userId?: string }>();
  const title = type === 'followerlist' ? '띱 목록' : '내 띱 목록';

  // 상태 관리
  const [userList, setUserList] = useState<FollowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [nextCursor, setNextCursor] = useState<string>('');
  const [isLast, setIsLast] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  // API 호출 함수
  const loadUserList = useCallback(
    async (cursor?: string) => {
      if (loading) return;

      try {
        setLoading(true);
        setError(null);
        let response;

        if (type === 'followerlist') {
          // 띱 목록 API 호출
          if (!userId) {
            console.error('userId가 없습니다.');
            setError('사용자 ID가 없습니다.');
            return;
          }
          response = await getFollowerList(userId, { size: 10, cursor: cursor || null });
        } else {
          // 내 띱 목록 API 호출
          response = await getFollowingList({ size: 10, cursor: cursor || null });
        }

        // type에 따라 적절한 데이터 추출
        let userData: FollowData[] = [];
        if (type === 'followerlist') {
          userData = (response.data as { followers: FollowData[] })?.followers || [];
        } else {
          userData = (response.data as { followings: FollowData[] })?.followings || [];
        }

        console.log('API 응답:', response);
        console.log('추출된 사용자 데이터:', userData);

        // API 응답이 유효한지 확인
        if (!response || !response.data) {
          console.error('API 응답이 없습니다.');
          setError('API 응답이 없습니다.');
          return;
        }

        if (cursor) {
          // 다음 페이지 데이터 추가 (무한 스크롤)
          setUserList(prev => [...prev, ...userData]);
        } else {
          // 첫 페이지 데이터 설정
          setUserList(userData);
        }

        setNextCursor(response.data.nextCursor);
        setIsLast(response.data.isLast);
        // setTotalCount(prev => prev + userData.length);
        setRetryCount(0);
      } catch (error) {
        console.error('사용자 목록 로드 실패:', error);
        setError('사용자 목록을 불러오는데 실패했습니다.');
        setRetryCount(prev => prev + 1);
        // 에러 발생 시 로딩 상태를 false로 설정하여 무한 요청 방지
      } finally {
        setLoading(false);
      }
    },
    [type, userId],
  );

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      // 로딩 중이거나 마지막 페이지이거나 에러가 있거나 재시도 횟수 초과시 요청하지 않음
      if (loading || isLast || error || retryCount >= 3 || !nextCursor) {
        console.log('스크롤 요청 차단:', { loading, isLast, error, retryCount, nextCursor });
        return;
      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadUserList(nextCursor);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLast, error, retryCount, nextCursor, loadUserList]);

  // 초기 데이터 로드
  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  return (
    <Wrapper>
      <TitleHeader leftIcon={<img src={leftArrow} />} onLeftClick={handleBackClick} title={title} />
      <TotalBar>전체 {userList.length}</TotalBar>
      <UserProfileList>
        {userList.map((user, index) => (
          <UserProfileItem
            key={user.userId}
            profileImageUrl={user.profileImageUrl}
            nickname={user.nickname}
            aliasName={user.aliasName}
            aliasColor={user.aliasColor}
            followerCount={user.followerCount}
            userId={user.userId}
            type={type as UserProfileType}
            isFollowing={user.isFollowing}
            isLast={index === userList.length - 1}
            isMyself={user.isMyself}
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
  padding: 0 20px;
  margin: 0 auto;
  background-color: var(--color-black-main);
`;

const TotalBar = styled.div`
  position: fixed;
  top: 0;
  width: 94.8%;
  max-width: 727px;
  min-width: 320px;
  padding: 76px 0px 4px 0px;
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
  /* min-width: 320px;
  max-width: 540px; */
  padding-top: 105px;
  padding-bottom: 20px;
`;

export default FollowerListPage;
