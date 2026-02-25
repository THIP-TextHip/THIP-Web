import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TitleHeader from '../../components/common/TitleHeader';
import MemberList from '../../components/members/MemberList';
import leftArrow from '../../assets/common/leftArrow.svg';
import { Wrapper, ErrorContainer, EmptyContainer } from './GroupMembers.styled';
import {
  getRoomMembers,
  convertRoomMembersToMembers,
  type Member,
} from '@/api/rooms/getRoomMembers';
import { MemberListSkeleton } from '@/shared/ui/Skeleton';

const GroupMembers = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const currentRoomId = roomId || localStorage.getItem('currentRoomId') || '1';

      if (!currentRoomId) {
        setError('방 ID를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 500));
        const [response] = await Promise.all([
          getRoomMembers(parseInt(currentRoomId)),
        ]);
        await minLoadingTime;

        if (response.isSuccess) {
          const convertedMembers = convertRoomMembersToMembers(response.data.userList);
          setMembers(convertedMembers);
        } else {
          setError(response.message);
        }
      } catch (err: unknown) {
        console.error('독서메이트 조회 오류:', err);

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
    const member = members.find(m => m.id === memberId);
    if (member?.isMyself) {
      navigate(`/myfeed/${memberId}`);
    } else {
      navigate(`/otherfeed/${memberId}`);
    }
  };

  if (loading) {
    return (
      <>
        <TitleHeader
          leftIcon={<img src={leftArrow} alt="뒤로가기" />}
          title="독서메이트"
          onLeftClick={handleBackClick}
        />
        <Wrapper>
          <MemberListSkeleton />
        </Wrapper>
      </>
    );
  }

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
