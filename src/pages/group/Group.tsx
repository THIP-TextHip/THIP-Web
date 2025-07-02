import MainHeader from '@/components/common/MainHeader';
import SearchBar from '@/components/common/SearchBar';
import { Wrapper } from '@/components/common/Wrapper';

const Group = () => {
  return (
    <Wrapper>
      <MainHeader type="group" />
      <SearchBar placeholder="모임방 참여할 사람!" />
    </Wrapper>
  );
};

export default Group;
