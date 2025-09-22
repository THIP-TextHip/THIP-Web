import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import { colors, typography } from '@/styles/global/global';
import { useNavigate } from 'react-router-dom';
import { getRoomDetail } from '@/api/rooms/getRoomDetail';

interface Props {
  groups: Group[];
  title: string;
}

const GENRE = ['문학', '과학·IT', '사회과학', '인문학', '예술'];

export function RecruitingGroupBox({ groups, title }: Props) {
  const [selected, setSelected] = useState<string>('문학');
  const navigate = useNavigate();

  const filtered = useMemo(() => groups.filter(g => g.genre === selected), [groups, selected]);

  const handleGroupCardClick = async (groupId: number | string) => {
    try {
      const roomId = typeof groupId === 'string' ? parseInt(groupId) : groupId;

      const response = await getRoomDetail(roomId);

      if (response.isSuccess) {
        navigate(`/group/detail/${roomId}`);
      }
    } catch (error) {
      console.error('방 상세 정보 조회 오류:', error);
      navigate(`/group/${groupId}`);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <TabContainer>
        {GENRE.map(tab => (
          <Tab key={tab} selected={tab === selected} onClick={() => setSelected(tab)}>
            {tab}
          </Tab>
        ))}
      </TabContainer>
      <Grid>
        {filtered.length > 0 ? (
          filtered.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              type={'main'}
              onClick={() => handleGroupCardClick(group.id)}
            />
          ))
        ) : (
          <EmptyContent>
            <EmptyMainText>모임방이 아직 없어요.</EmptyMainText>
            <EmptySubText>해당 장르의 모임방이 생기면 보여줄게요!</EmptySubText>
          </EmptyContent>
        )}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 260px;
  max-width: 704px;
  width: 100%;
  overflow-x: hidden;
  padding: 20px 0;
  background: var(--color-main-black);
  border-radius: 12px;
  margin-bottom: 76px;
  background: var(
    --gradient_card-carousel_groupmain,
    linear-gradient(
      180deg,
      var(--color-view-card_background_grey03, #525252) 0%,
      var(--color-button-color_fill-button_fill_black, #121212) 100%
    )
  );
`;

const Title = styled.h2`
  color: #fff;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: 32px;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ selected?: boolean }>`
  white-space: nowrap;
  padding: 8px 12px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  border: none;
  border-radius: 16px;
  background: ${({ selected }) =>
    selected ? 'var(--color-purple-main)' : 'var(--color-darkgrey-main)'};
  color: #fff;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;

  @media (min-width: 584px) {
    grid-template-columns: 1fr 1fr;
  }

  /* 항목이 하나일 때는 전체 열 사용 (2열로 쪼개지지 않도록 처리) */
  & > *:only-child {
    grid-column: 1 / -1;
  }
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 133px;
  padding: 60px 20px;
  grid-column: 1 / -1;
`;

const EmptyMainText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
  margin: 0;
`;

const EmptySubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
  margin: 0;
`;
