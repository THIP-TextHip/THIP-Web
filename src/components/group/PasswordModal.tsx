import React, { useState, useRef, useEffect } from 'react';
import {
  Overlay,
  Title,
  PasswordInputContainer,
  PasswordInput,
  ErrorMessage,
} from './PasswordModal.styled';
import leftArrow from '@/assets/common/leftArrow.svg';
import TitleHeader from '@/components/common/TitleHeader';
import { postPassword } from '@/api/rooms/postPassword';
import { postJoinRoom } from '@/api/rooms/postJoinRoom';
import { usePopupActions } from '@/hooks/usePopupActions';

interface PasswordModalProps {
  roomId: number;
  onClose: () => void;
  onJoined?: (roomId: number) => void;
}

const PasswordModal = ({ roomId, onClose, onJoined }: PasswordModalProps) => {
  const [password, setPassword] = useState<string[]>(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { openSnackbar } = usePopupActions();

  useEffect(() => {
    setPassword(['', '', '', '']);
    setActiveIndex(0);
    setErrorMessage('');
  }, []);

  useEffect(() => {
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(''), 1500);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  const handleClickBack = () => {
    onClose(); // ✅ 라우터 대신 닫기
  };

  const handlePasswordConfirm = async (fullPassword: string) => {
    setErrorMessage('');
    try {
      const passwordResponse = await postPassword(roomId, { password: fullPassword });

      if (passwordResponse.isSuccess && passwordResponse.data.matched) {
        const joinResponse = await postJoinRoom(roomId, 'join');

        if (joinResponse.isSuccess) {
          openSnackbar({
            message: '모임방 참여가 완료되었어요! 모집 마감 후 활동이 시작돼요.',
            variant: 'top',
            onClose: () => {},
          });
          onClose();
          onJoined?.(roomId); // ✅ 부모에서 후처리(예: 상세 이동/리스트 갱신)
        } else {
          openSnackbar({
            message: '모임방 참여에 실패했어요. 다시 시도해 주세요.',
            variant: 'top',
            onClose: () => {},
          });
        }
      } else {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
        setPassword(['', '', '', '']);
        setActiveIndex(0);
      }
    } catch {
      setErrorMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setPassword(['', '', '', '']);
      setActiveIndex(0);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...password];
    next[index] = value;
    setPassword(next);

    if (value && index < 3) setActiveIndex(index + 1);
    if (next.every(digit => digit !== '') && index === 3) {
      handlePasswordConfirm(next.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (password[index] === '' && index > 0) {
        setActiveIndex(index - 1);
        const next = [...password];
        next[index - 1] = '';
        setPassword(next);
      } else {
        const next = [...password];
        next[index] = '';
        setPassword(next);
      }
    }
  };

  const handleInputClick = (index: number) => setActiveIndex(index);

  return (
    <Overlay>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로 가기" />}
        onLeftClick={handleClickBack}
      />
      <Title>비밀번호를 입력해주세요.</Title>
      <PasswordInputContainer>
        {password.map((digit, index) => (
          <PasswordInput
            key={index}
            ref={el => void (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            onChange={e => handleInputChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onClick={() => handleInputClick(index)}
            maxLength={1}
            inputMode="numeric"
            hasError={!!errorMessage}
          />
        ))}
      </PasswordInputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Overlay>
  );
};

export default PasswordModal;
