import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import leftArrow from '@/assets/common/leftArrow.svg';
import TitleHeader from '@/components/common/TitleHeader';
import { useNavigate } from 'react-router-dom';
import { postPassword } from '@/api/rooms/postPassword';
import { postJoinRoom } from '@/api/rooms/postJoinRoom';
import { usePopupActions } from '@/hooks/usePopupActions';

interface PasswordModalProps {
  roomId: number;
}

const PasswordModal = ({ roomId }: PasswordModalProps) => {
  const [password, setPassword] = useState<string[]>(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { openSnackbar } = usePopupActions();

  // 컴포넌트 마운트 시 상태 초기화
  useEffect(() => {
    setPassword(['', '', '', '']);
    setActiveIndex(0);
    setErrorMessage('');
  }, []);

  // 입력 필드 포커스 관리
  useEffect(() => {
    if (inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleClickBack = () => {
    navigate(-1);
  };

  // 비밀번호 확인 API 호출
  const handlePasswordConfirm = async (fullPassword: string) => {
    setErrorMessage('');

    try {
      // 1. 비밀번호 확인 API 호출
      const passwordResponse = await postPassword(roomId, { password: fullPassword });

      if (passwordResponse.isSuccess && passwordResponse.data.matched) {
        // 2. 비밀번호가 맞으면 방 참가 API 호출
        const joinResponse = await postJoinRoom(roomId, 'join');

        if (joinResponse.isSuccess) {
          // 성공 후 처리 (방 상세 페이지로 이동)
          navigate(`/group/detail/${roomId}`);
          // 성공 snackbar 표시
          openSnackbar({
            message: '모임방 참여가 완료되었어요! 모집 마감 후 활동이 시작돼요.',
            variant: 'top',
            onClose: () => {},
          });
        } else {
          // 실패 후 처리 (방 상세 페이지로 이동)
          navigate(`/group/detail/${roomId}`);
          // 실패 snackbar 표시
          openSnackbar({
            message: '모임방 참여에 실패했어요. 다시 시도해 주세요.',
            variant: 'top',
            onClose: () => {},
          });
        }
      } else {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
        // 비밀번호 입력 필드 초기화
        setPassword(['', '', '', '']);
        setActiveIndex(0);
      }
    } catch {
      setErrorMessage('오류가 발생했습니다. 다시 시도해주세요.');
      // 비밀번호 입력 필드 초기화
      setPassword(['', '', '', '']);
      setActiveIndex(0);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    // 숫자만 입력 허용
    if (!/^\d*$/.test(value)) return;

    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);

    // 다음 입력 필드로 이동
    if (value && index < 3) {
      setActiveIndex(index + 1);
    }

    // 4자리 모두 입력 완료 시 자동으로 비밀번호 확인
    if (newPassword.every(digit => digit !== '') && index === 3) {
      const fullPassword = newPassword.join('');
      handlePasswordConfirm(fullPassword);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (password[index] === '') {
        // 현재 필드가 비어있으면 이전 필드로 이동
        if (index > 0) {
          setActiveIndex(index - 1);
          const newPassword = [...password];
          newPassword[index - 1] = '';
          setPassword(newPassword);
        }
      } else {
        // 현재 필드 내용 삭제
        const newPassword = [...password];
        newPassword[index] = '';
        setPassword(newPassword);
      }
    }
  };

  const handleInputClick = (index: number) => {
    setActiveIndex(index);
  };

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
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 320px;
  max-width: 767px;
  min-height: 100vh;
  background-color: ${colors.black.main};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2000;
`;

const Title = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
  letter-spacing: 0.018px;
  text-align: center;
  margin-top: 217px;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const PasswordInput = styled.input<{ hasError: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: ${colors.darkgrey.main};
  border: ${props => (props.hasError ? `1px solid ${colors.red}` : 'none')};
  outline: none;

  text-align: center;
  color: ${colors.white};
  caret-color: ${colors.neongreen};
  font-family: ${typography.fontFamily.secondary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: normal;
`;

const ErrorMessage = styled.div`
  color: ${colors.red};
  font-size: ${typography.fontSize.sm};
  text-align: center;
  margin-top: 12px;
`;
