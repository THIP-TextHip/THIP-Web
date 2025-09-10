import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import type { MoreMenuProps } from '@/stores/usePopupStore';

const MoreMenu = ({ onEdit, onDelete, onClose, onReport, isWriter, type }: MoreMenuProps) => {
  return (
    <Overlay onClick={() => onClose?.()}>
      {type === 'post' ? (
        // post 타입: 기존 로직 유지
        <>
          {isWriter ? (
            <>
              <RecordContainer onClick={e => e.stopPropagation()}>
                <Button variant="edit" onClick={onEdit}>
                  수정하기
                </Button>
                <Button variant="delete" onClick={onDelete}>
                  삭제하기
                </Button>
              </RecordContainer>
            </>
          ) : (
            <ReportContainer onClick={e => e.stopPropagation()}>
              <Button variant="report" onClick={onReport}>
                신고하기
              </Button>
            </ReportContainer>
          )}
        </>
      ) : (
        // reply 타입: isWriter에 따라 삭제하기 또는 신고하기만 표시
        <>
          {isWriter ? (
            <ReportContainer onClick={e => e.stopPropagation()}>
              <Button variant="delete" onClick={onDelete}>
                삭제하기
              </Button>
            </ReportContainer>
          ) : (
            <ReportContainer onClick={e => e.stopPropagation()}>
              <Button variant="report" onClick={onReport}>
                신고하기
              </Button>
            </ReportContainer>
          )}
        </>
      )}
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  /* ⬇︎ 핵심: 실제 보이는 높이로 맞추기 (dvh 폴백 포함) */
  height: 100vh;
  @supports (height: 100dvh) {
    height: 100dvh;
  }
  /* JS 폴백 변수 */
  height: var(--vvh, 100dvh);

  /* ⬇︎ 하단 안전영역만큼 띄워서 탭바/홈바를 피함 */
  padding-bottom: env(safe-area-inset-bottom, 0);

  width: 100vw;
  background-color: rgba(18, 18, 18, 0.1);
  backdrop-filter: blur(2.5px);
  z-index: 1200;
`;

const ReportContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  width: 100%;
  height: 90px;
  padding: 20px;
  border-radius: 12px 12px 0px 0px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom, 0));
  background-color: ${colors.darkgrey.main};
`;

// 3개 버튼을 위한 컨테이너 (핀하기 포함)
const RecordContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  max-width: 767px;
  width: 100%;
  padding: 20px;
  border-radius: 12px 12px 0px 0px;
  background-color: ${colors.darkgrey.main};
`;

const Button = styled.div<{ variant: 'edit' | 'delete' | 'report' | 'pin' }>`
  display: flex;
  height: 50px;
  align-items: center;
  color: ${({ variant }) => {
    if (variant === 'edit') return colors.white;
    if (variant === 'delete') return colors.red;
    if (variant === 'report') return colors.red;
    if (variant === 'pin') return colors.white;
    return colors.white;
  }};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  border-bottom: 1px solid ${colors.grey[400]};
  cursor: pointer;

  ${({ variant }) => {
    if (variant === 'report') {
      return `
        padding: 0;
        border-bottom: none;
      `;
    }
    if (variant === 'pin') {
      return `
        &:first-of-type {
          padding: 13px 12px 21px 12px;
        }
        
        &:nth-of-type(2) {
          padding: 13px 12px 21px 12px;
        }

        &:last-of-type {
          padding: 21px 12px 13px 12px;
          border-bottom: none;
        }
      `;
    }
    return `
      &:first-of-type {
        padding: 13px 12px 21px 12px;
      }
      
      &:nth-of-type(2) {
        padding: 13px 12px 21px 12px;
      }

      &:last-of-type {
        padding: 21px 12px 13px 12px;
        border-bottom: none;
      }
    `;
  }}
`;

export default MoreMenu;
