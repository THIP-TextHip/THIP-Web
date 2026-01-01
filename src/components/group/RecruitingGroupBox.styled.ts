import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

export const Title = styled.h2`
  color: #fff;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: 32px;
  text-align: center;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 24px;

  @media (max-width: 373px) {
    max-width: 240px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Tab = styled.button<{ selected?: boolean }>`
  white-space: nowrap;
  padding: 8px 12px;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.regular};
  border: none;
  border-radius: 16px;
  background: ${({ selected }) =>
    selected ? 'var(--color-purple-main)' : 'var(--color-darkgrey-main)'};
  color: #fff;
  cursor: pointer;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;

  @media (min-width: 584px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 133px;
  padding: 60px 20px;
  grid-column: 1 / -1;
`;

export const EmptyMainText = styled.p`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
  margin: 0;
`;

export const EmptySubText = styled.p`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  text-align: center;
  margin: 0;
`;
