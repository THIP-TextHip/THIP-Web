import styled from '@emotion/styled';

export const NavWrapper = styled.div`
  position: relative;
`;

export const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space_between;
  align-items: center;
  margin: 0 auto;

  min-width: 320px;
  max-width: 767px;
  height: 75px;
  padding: 16px 32px;

  border-top: 1px solid var(--color-grey-300);
  border-radius: 12px 12px 0px 0px;
  background-color: var(--color-black-main);
`;

export const NavItem = styled.div<{ active?: boolean }>`
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
