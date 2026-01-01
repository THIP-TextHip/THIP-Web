import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  margin: 0 auto;

  min-width: 320px;
  max-width: 767px;
  gap: 20px;
  padding: 88px 20px 0 20px;
  background-color: var(--color-black-main);
  z-index: 1;
`;

export const TabButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60px;
  padding: 8px 4px;
  font-size: var(--font-size-lg);
  cursor: pointer;
  position: relative;

  &.active {
    color: var(--color-white);
    font-weight: var(--font-weight-semibold);
    line-height: 24px;
  }
  &.inactive {
    color: var(--color-grey-300);
    font-weight: var(--font-weight-medium);
    line-height: 24px;
  }
`;

export interface ActiveIndicatorProps {
  activeIndex: number;
}

export const ActiveIndicator = styled.div<ActiveIndicatorProps>`
  position: absolute;
  bottom: 0;
  left: 20px;
  width: 60px;
  height: 2px;
  background-color: var(--color-white);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${props => props.activeIndex * 80}px);
`;
