import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Fab from './Fab';
import type { FabProps } from '../../types/fab';
import FeedIcon from '../../assets/navbar/feed.svg';
import GroupIcon from '../../assets/navbar/group.svg';
import SearchIcon from '../../assets/navbar/search.svg';
import MyIcon from '../../assets/navbar/my.svg';
import FeedIconActive from '../../assets/navbar/feed-active.svg';
import GroupIconActive from '../../assets/navbar/group-active.svg';
import SearchIconActive from '../../assets/navbar/search-active.svg';
import MyIconActive from '../../assets/navbar/my-active.svg';

const NavWrapper = styled.div`
  position: relative;
`;

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  min-width: 320px;
  max-width: 767px;
  height: 75px;
  padding: 16px 32px;

  border-top: 1px solid var(--color-grey-300);
  border-left: 1px solid var(--color-grey-300);
  border-right: 1px solid var(--color-grey-300);
  border-radius: 12px 12px 0px 0px;
  background-color: var(--color-black-main);
`;

const NavItem = styled.div<{ active?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 12px;
  color: ${({ active }) => (active ? 'var(--color-purple-main)' : 'var(--color-grey-300)')};

  svg {
    display: flex;
    width: 24px;
    height: 24px;
    padding: 4px 2px;
    justify-content: center;
    align-items: center;
  }
`;

type RouteItem = {
  path: string;
  label: string;
  icon: string;
  activeIcon: string;
};

const items: RouteItem[] = [
  { path: '/feed', label: '피드', icon: FeedIcon, activeIcon: FeedIconActive },
  { path: '/group', label: '모임', icon: GroupIcon, activeIcon: GroupIconActive },
  { path: '/search', label: '검색', icon: SearchIcon, activeIcon: SearchIconActive },
  { path: '/my', label: '내 정보', icon: MyIcon, activeIcon: MyIconActive },
];

const NavBar = ({ src, path }: FabProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <NavWrapper>
      <NavContainer>
        {items.map(item => {
          const isActive = pathname === item.path;
          const src = isActive ? item.activeIcon : item.icon;

          return (
            <NavItem key={item.path} active={isActive} onClick={() => navigate(item.path)}>
              <img src={src} alt={item.label} />
              <div>{item.label}</div>
            </NavItem>
          );
        })}
        <Fab src={src} path={path} />
      </NavContainer>
    </NavWrapper>
  );
};

export default NavBar;
