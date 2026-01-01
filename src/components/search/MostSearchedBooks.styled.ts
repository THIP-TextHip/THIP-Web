import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 20px 0 20px;
  background-color: var(--color-black-main);
  margin-bottom: 72px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: ${typography.fontSize.lg};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.semibold};
`;

export const DateText = styled.span`
  font-size: ${typography.fontSize.xs};
  color: ${colors.grey[300]};
  font-weight: ${typography.fontWeight.regular};
`;

export const BookList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

export const BookItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${colors.darkgrey.dark};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.darkgrey.main};
  }
`;

export const Rank = styled.span`
  font-size: ${typography.fontSize.base};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.medium};
  width: 24px;
`;

export const Cover = styled.img`
  width: 45px;
  height: 60px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const BookTitle = styled.span`
  font-size: ${typography.fontSize.sm};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.regular};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
  flex: 1 1 0%;
  min-width: 0;
  max-width: calc(100% - 77px);
`;

export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

export const MainText = styled.div`
  font-size: ${typography.fontSize.lg};
  color: ${colors.white};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: 8px;
`;

export const SubText = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.grey[100]};
  font-weight: ${typography.fontWeight.regular};
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${typography.fontSize.base};
  color: ${colors.grey[200]};
  font-weight: ${typography.fontWeight.regular};
`;


