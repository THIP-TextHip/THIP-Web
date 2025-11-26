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

const PasswordInputSection = ({ password, onPasswordChange }: PasswordInputSectionProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 4) {
      onPasswordChange(numericValue);
    }
  };

  const handleClose = () => {
    onPasswordChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
    const isNumber = /^[0-9]$/;

    if (!allowedKeys.includes(e.key) && !isNumber.test(e.key)) {
      e.preventDefault();
    }

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
