import MainHeader from '@/components/common/MainHeader';
import NavBar from '@/components/common/NavBar';
import SearchBar from '@/components/common/SearchBar';
import { Wrapper } from '@/components/common/Wrapper';
import type { Group as GroupType } from '@/components/group/MyGroup';
import { MyGroup } from '../../components/group/MyGroup';

const dummyMyGroups: GroupType[] = [
  {
    id: '1',
    title: '호르몬 체인지 완독하는 방',
    participants: 22,
    userName: 'hoho',
    progress: 40,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
  },
  {
    id: '2',
    title: '시집만 읽는 사람들 3월',
    userName: 'hoho2',
    participants: 15,
    progress: 0,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
  },
  {
    id: '3',
    title: '일본 소설 좋아하는 사람들',
    userName: 'hoho3',
    participants: 30,
    progress: 100,
    coverUrl:
      'https://marketplace.canva.com/EAF9zlwqylI/1/0/1003w/canva-%EB%B2%A0%EC%9D%B4%EC%A7%80-%EC%A3%BC%ED%99%A9-%EA%B7%80%EC%97%BD%EA%B3%A0-%EB%AF%B8%EB%8B%88%EB%A9%80%ED%95%9C-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-e%EB%B6%81-%EC%9C%84%EB%A1%9C-%EC%A2%8B%EC%9D%80%EA%B8%80-%EC%B1%85%ED%91%9C%EC%A7%80-zrZ6hI8_IWo.jpg',
  },
];

const Group = () => {
  return (
    <Wrapper>
      <MainHeader type="group" />
      <SearchBar placeholder="모임방 참여할 사람!" />
      <MyGroup groups={dummyMyGroups}></MyGroup>
      <NavBar />
    </Wrapper>
  );
};

export default Group;
