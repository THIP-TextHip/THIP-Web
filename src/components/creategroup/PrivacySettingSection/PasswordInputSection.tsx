import {
  PasswordInputContainer,
  PasswordInputBox,
  PasswordInput,
  CloseButton,
} from './PasswordInputSection.styled';
import closeIcon from '../../../assets/group/close.svg';

interface PasswordInputSectionProps {
  password: string;
  onPasswordChange: (password: string) => void;
  onClose: () => void;
}

const PasswordInputSection = ({
  password,
  onPasswordChange,
  onClose,
}: PasswordInputSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 허용하고 최대 4자리까지만 입력 가능
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 4) {
      onPasswordChange(numericValue);
    }
  };

  const handleClose = () => {
    onPasswordChange(''); // 입력된 숫자 전체 삭제
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 숫자, 백스페이스, 삭제, 탭, 엔터만 허용
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
    const isNumber = /^[0-9]$/;

    if (!allowedKeys.includes(e.key) && !isNumber.test(e.key)) {
      e.preventDefault();
    }

    // 이미 4자리면 새로운 숫자 입력 방지
    if (password.length >= 4 && isNumber.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <PasswordInputContainer>
      <PasswordInputBox>
        <PasswordInput
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="4자리 숫자로 방 비밀번호를 설정하세요"
          value={password}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={4}
        />
        <CloseButton onClick={handleClose}>
          <img src={closeIcon} alt="닫기" />
        </CloseButton>
      </PasswordInputBox>
    </PasswordInputContainer>
  );
};

export default PasswordInputSection;
