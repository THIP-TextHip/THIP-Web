import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import type { SnackbarProps } from '@/stores/usePopupStore';
import { useEffect, useState } from 'react';

const Snackbar = ({ message, actionText, variant, onActionClick, onClose }: SnackbarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const showDuration = variant === 'bottom' ? 7000 : 4000;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 2000);
    }, showDuration);

    return () => clearTimeout(timer);
  }, [variant, onClose]);

  return (
    <Container variant={variant} visible={visible}>
      <Discription>{message}</Discription>
      {variant === 'bottom' && actionText && <Button onClick={onActionClick}>{actionText}</Button>}
    </Container>
  );
};

export default Snackbar;

const Container = styled.div<{ variant: 'top' | 'bottom'; visible: boolean }>`
  position: fixed;
  ${({ variant }) => (variant === 'top' ? 'top: 16px;' : 'bottom: 16px;')}
  left: 50%;
  min-width: 280px;
  max-width: 500px;
  width: calc(100% - 40px);
  padding: 12px;
  margin: 0 auto;
  background: ${colors.darkgrey.main};
  color: ${colors.white};
  border: 1px solid ${colors.grey[200]};
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1100;
  transform: translateX(-50%)
    ${({ variant, visible }) =>
      visible ? 'translateY(0)' : variant === 'top' ? 'translateY(-150%)' : 'translateY(150%)'};
  transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Discription = styled.div`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
`;

const Button = styled.div`
  color: ${colors.neongreen};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
`;
