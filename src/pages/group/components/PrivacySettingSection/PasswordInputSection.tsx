import {
  PasswordInputContainer,
  PasswordInputBox,
  PasswordInput,
  CloseButton,
} from './PasswordInputSection.styled.ts';
import closeIcon from '../../../../assets/group/close.svg';

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
    if (/^\d*$/.test(value) && value.length <= 4) {
      onPasswordChange(value);
    }
  };

  return (
    <PasswordInputContainer>
      <PasswordInputBox>
        <PasswordInput
          type="number"
          placeholder="4자리 숫자로 방 비밀번호를 설정하세요"
          value={password}
          onChange={handleInputChange}
          maxLength={4}
        />
        <CloseButton onClick={onClose}>
          <img src={closeIcon} alt="닫기" />
        </CloseButton>
      </PasswordInputBox>
    </PasswordInputContainer>
  );
};

export default PasswordInputSection;
