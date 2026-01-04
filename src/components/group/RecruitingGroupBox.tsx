import { useMemo, useState } from 'react';
import type { Group } from './MyGroupBox';
import { GroupCard } from './GroupCard';
import { useNavigate } from 'react-router-dom';
import { getRoomDetail } from '@/api/rooms/getRoomDetail';
import {
  Container,
  Title,
  TabContainer,
  Tab,
  Grid,
  EmptyContent,
  EmptyMainText,
  EmptySubText,
} from './RecruitingGroupBox.styled';

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
