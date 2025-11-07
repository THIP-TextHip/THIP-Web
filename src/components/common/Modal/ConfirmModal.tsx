import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import type { ConfirmModalProps } from '@/stores/usePopupStore';

const ConfirmModal = ({
  title,
  disc,
  onConfirm,
  onClose,
  confirmText = '예',
  cancelText = '아니요',
}: ConfirmModalProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container onClick={handleContainerClick}>
      <div className="title">{title}</div>
      <div className="disc" dangerouslySetInnerHTML={{ __html: disc }} />
      <ButtonContainer>
        <Button variant="no" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="yes" onClick={onConfirm}>
          {confirmText}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 182px;
  padding: 20px;
  justify-content: space-between;
  border-radius: 12px;
  background-color: ${colors.darkgrey.main};

  .title {
    color: ${colors.white};
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.medium};
    line-height: 24px;
  }

  .disc {
    color: ${colors.white};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.regular};
    line-height: normal;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Button = styled.div<{ variant: 'yes' | 'no' }>`
  width: 130px;
  height: 44px;
  padding: 10px 12px;
  border-radius: 12px;
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  text-align: center;
  line-height: 24px;
  background-color: ${({ variant }) => (variant === 'yes' ? colors.purple.main : colors.grey[300])};
  cursor: pointer;
`;

export default ConfirmModal;
