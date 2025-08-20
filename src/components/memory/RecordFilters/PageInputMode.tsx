import refreshIcon from '../../../assets/memory/refresh.svg';
import checkIcon from '../../../assets/memory/check.svg';
import {
  InputContainer,
  InputWrapper,
  PageInput,
  Separator,
  PageLabel,
  ResetButton,
  ConfirmButton,
} from './PageInputMode.styled';

interface PageInputModeProps {
  startPage: string;
  endPage: string;
  onInputChange: (type: 'start' | 'end', value: string) => void;
  onReset: () => void;
  onConfirm: () => void;
  hasAnyInput: boolean;
  isValid: boolean;
}

const PageInputMode = ({
  startPage,
  endPage,
  onInputChange,
  onReset,
  onConfirm,
  hasAnyInput,
  isValid,
}: PageInputModeProps) => {
  return (
    <InputContainer>
      <InputWrapper hasValue={startPage.length > 0}>
        <PageInput
          value={startPage}
          placeholder=""
          onChange={e => onInputChange('start', e.target.value)}
          type="number"
          autoFocus
          style={{
            width: startPage.length > 0 ? `${Math.max(36, startPage.length * 12)}px` : '36px',
          }}
        />
      </InputWrapper>
      <Separator>~</Separator>
      <InputWrapper hasValue={endPage.length > 0}>
        <PageInput
          value={endPage}
          placeholder=""
          onChange={e => onInputChange('end', e.target.value)}
          type="number"
          style={{
            width: endPage.length > 0 ? `${Math.max(36, endPage.length * 12)}px` : '36px',
          }}
        />
      </InputWrapper>
      <PageLabel>p</PageLabel>
      <ResetButton active={hasAnyInput} onClick={onReset}>
        <img src={refreshIcon} alt="초기화" />
      </ResetButton>
      <ConfirmButton onClick={onConfirm} disabled={!isValid}>
        <img src={checkIcon} alt="완료" />
      </ConfirmButton>
    </InputContainer>
  );
};

export default PageInputMode;
