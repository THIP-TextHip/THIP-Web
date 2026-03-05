import { useNavigate, useLocation } from 'react-router-dom';
import Fab from './Fab';
import FeedIcon from '../../assets/navbar/feed.svg';
import GroupIcon from '../../assets/navbar/group.svg';
import SearchIcon from '../../assets/navbar/search.svg';
import MyIcon from '../../assets/navbar/my.svg';
import FeedIconActive from '../../assets/navbar/feed-active.svg';
import GroupIconActive from '../../assets/navbar/group-active.svg';
import SearchIconActive from '../../assets/navbar/search-active.svg';
import MyIconActive from '../../assets/navbar/my-active.svg';
import { NavWrapper, NavContainer, NavItem } from './NavBar.styled';

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
  { path: '/mypage', label: '내 정보', icon: MyIcon, activeIcon: MyIconActive },
];

interface NavBarProps {
  src?: string;
  path?: string;
}

const NavBar = ({ src, path }: NavBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <NavWrapper>
      <NavContainer>
        {items.map(item => {
          const isActive = pathname === item.path;
          const iconSrc = isActive ? item.activeIcon : item.icon;

          return (
            <NavItem key={item.path} active={isActive} onClick={() => navigate(item.path)}>
              <img src={iconSrc} alt={item.label} />
              <div>{item.label}</div>
            </NavItem>
          );
        })}
        {path && <Fab src={src} path={path} />}
      </NavContainer>
    </NavWrapper>
  );
};

export default NavBar;
