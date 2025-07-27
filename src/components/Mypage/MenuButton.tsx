import { colors, typography } from '@/styles/global/global';
import styled from '@emotion/styled';
import rightArrow from '../../assets/common/right-Chevron.svg';

export interface MenuButtonProps {
  src: string;
  name: string;
}

const MenuButton = ({ src, name }: MenuButtonProps) => {
  return (
    <Wrapper>
      <div className="main">
        <img src={src} />
        <div>{name}</div>
      </div>
      <img src={rightArrow} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-width: 280px;
  width: 100%;
  height: 56px;
  padding: 16px 12px;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  background-color: ${colors.darkgrey.dark};

  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;

  .main {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;

export default MenuButton;
