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
      setTimeout(() => onClose(), 2000); // 애니메이션 끝난 후 닫힘
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
  transform: translateX(-50%)
    ${({ variant, visible }) =>
      visible
        ? 'translateY(0)' // 고정 상태
        : variant === 'top'
          ? 'translateY(-150%)' // 위로 올라감
          : 'translateY(150%)'}; // 아래로 내려감
  min-width: 280px;
  max-width: 500px;
  width: calc(100% - 40px);
  padding: 12px 20px;
  margin: 0 auto;
  background: ${colors.darkgrey.main};
  color: ${colors.white};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: transform 2s ease-in-out;
  z-index: 1100;
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
