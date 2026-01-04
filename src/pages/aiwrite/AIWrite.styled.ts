import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${colors.black.main};
  padding-top: 56px;
`;

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 20px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const Message = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  text-align: center;
`;

export const SubMessage = styled.div`
  color: ${colors.grey[100]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  text-align: center;
`;

export const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: auto;
`;

export const InfoBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 13px 26px;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    color: ${colors.grey[200]};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.regular};
    line-height: auto;
  }
`;

export const ContentText = styled.div`
  flex: 1;
  padding: 0 26px 74px;
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;
  white-space: pre-wrap;
`;

export const CopyButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 767px;
  height: 50px;
  background-color: ${colors.purple.main};
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  border: none;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
`;
