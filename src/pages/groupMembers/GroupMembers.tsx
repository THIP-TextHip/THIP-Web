import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import MemberList from '../../components/members/MemberList';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Wrapper, LoadingContainer, ErrorContainer, EmptyContainer } from './GroupMembers.styled';
import {
  getRoomMembers,
  convertRoomMembersToMembers,
  type Member,
  type RoomMembersResponse,
} from '@/api/rooms/getRoomMembers';

const GroupMembers = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  // API 상태 관리
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 호출
  useEffect(() => {
    const fetchMembers = async () => {
      // roomId 우선 순위: URL 파라미터 > localStorage > 기본값 1
      const currentRoomId = roomId || localStorage.getItem('currentRoomId') || '1';

      if (!currentRoomId) {
        setError('방 ID를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response: RoomMembersResponse = await getRoomMembers(parseInt(currentRoomId));

        if (response.isSuccess) {
          const convertedMembers = convertRoomMembersToMembers(response.data.userList);
          setMembers(convertedMembers);
        } else {
          setError(response.message);
        }
      } catch (err: unknown) {
        console.error('독서메이트 조회 오류:', err);
        
        // 방 접근 권한이 없는 경우 - 모임 홈으로 리다이렉트
        if (err instanceof Error && err.message === '방 접근 권한이 없습니다.') {
          navigate('/group', { replace: true });
          return;
        }
        
        setError('독서메이트 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [roomId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMemberClick = (memberId: string) => {
    // MemberList 컴포넌트에서 isMyself에 따른 네비게이션 처리를 담당하므로
    // 여기서는 기본 동작을 유지
    const member = members.find(m => m.id === memberId);
    if (member?.isMyself) {
      navigate(`/myfeed/${memberId}`);
    } else {
      navigate(`/otherfeed/${memberId}`);
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          title="독서메이트"
          onLeftClick={handleBackClick}
        />
        <Wrapper>
          <LoadingContainer>로딩 중...</LoadingContainer>
        </Wrapper>
      </>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          title="독서메이트"
          onLeftClick={handleBackClick}
        />
        <Wrapper>
          <ErrorContainer>{error}</ErrorContainer>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        title="독서메이트"
        onLeftClick={handleBackClick}
      />
      <Wrapper>
        {members.length > 0 ? (
          <MemberList members={members} onMemberClick={handleMemberClick} />
        ) : (
          <EmptyContainer>독서메이트가 없습니다.</EmptyContainer>
        )}
      </Wrapper>
    </>
  );
};

export default GroupMembers;
