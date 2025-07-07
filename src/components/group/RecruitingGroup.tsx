import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import type { Group } from './MyGroup';
import { RecruitingGroupCard } from './RecruitingGroupCard';

interface Props {
  groups: Group[];
  title: string;
}

const GENRE = ['문학', '과학·IT', '사회과학', '인문학', '예술'];

export function RecruitingGroup({ groups, title }: Props) {
  const [selected, setSelected] = useState<string>('문학');

  const filtered = useMemo(() => groups.filter(g => g.genre === selected), [groups, selected]);

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
        {filtered.map(group => (
          <RecruitingGroupCard key={group.id} group={group} />
        ))}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: var(--font-size-large02);
  font-weight: var(--font-weight-bold);
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
  font-size: var(--font-size-small03);
  font-weight: var(--font-weight-regular);
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
`;
