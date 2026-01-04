import rightArrow from '../../assets/common/right-Chevron.svg';
import { Wrapper } from './MenuButton.styled';

export interface MenuButtonProps {
  src: string;
  name: string;
  textColor?: string;
  isButton?: boolean;
  onClick?: () => void;
}

const MenuButton = ({ src, name, isButton, onClick }: MenuButtonProps) => {
  return (
    <Wrapper onClick={onClick}>
      <div className="main">
        <img src={src} />
        <div>{name}</div>
      </div>
      {isButton && <img src={rightArrow} />}
    </Wrapper>
  );
};

export default MenuButton;
