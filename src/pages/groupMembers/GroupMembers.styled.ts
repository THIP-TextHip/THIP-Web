import styled from '@emotion/styled';
import { colors } from '../../styles/global/global';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${colors.black.main};
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-grey-200);
  font-size: var(--string-size-base, 16px);
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-red);
  font-size: var(--string-size-base, 16px);
  text-align: center;
  padding: 20px;
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-grey-200);
  font-size: var(--string-size-base, 16px);
`;
