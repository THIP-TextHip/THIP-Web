import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
  margin-bottom: 72px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 72px;
`;

export const ResultHeader = styled.div`
  width: 100%;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.white};
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.darkgrey.dark};
`;

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 40%;
  color: var(--color-text-primary_white, #fefefe);
  text-align: center;
  font-size: var(--string-size-large01, 18px);
  font-weight: var(--string-weight-semibold, 600);
  line-height: var(--string-lineheight-height24, 24px);
`;

export const ObserverDiv = styled.div`
  height: 100px;
`;
