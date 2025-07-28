import { useState } from 'react';
import refreshIcon from '../../assets/memory/refresh.svg';
import {
  Overlay,
  Modal,
  Header,
  BackButton,
  Title,
  TabSection,
  Tab,
  FilterSection,
  PageFilter,
  SortButton,
  InfoSection,
  InfoIcon,
  InfoText,
  InputSection,
  InputGroup,
  PageInput,
  Separator,
  PageLabel,
  ResetButton,
  ConfirmButton,
  Keyboard,
  KeyboardRow,
  KeyButton,
} from './PageRangeModal.styled';

interface PageRangeModalProps {
  onClose: () => void;
  onSelect: (startPage: number, endPage: number) => void;
}

const PageRangeModal = ({ onClose, onSelect }: PageRangeModalProps) => {
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);

  const handleInputFocus = (type: 'start' | 'end') => {
    setActiveInput(type);
    setShowKeyboard(true);
  };

  const handleNumberClick = (num: string) => {
    if (activeInput === 'start') {
      setStartPage(prev => prev + num);
    } else if (activeInput === 'end') {
      setEndPage(prev => prev + num);
    }
  };

  const handleReset = () => {
    setStartPage('');
    setEndPage('');
  };

  const handleConfirm = () => {
    const start = parseInt(startPage);
    const end = parseInt(endPage);

    if (start && end && start <= end) {
      onSelect(start, end);
    }
  };

  const isValid = startPage !== '' && endPage !== '' && parseInt(startPage) <= parseInt(endPage);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <BackButton onClick={onClose}>←</BackButton>
          <Title>기록장</Title>
        </Header>

        <TabSection>
          <Tab active>그룹 기록</Tab>
          <Tab>내 기록</Tab>
        </TabSection>

        <FilterSection>
          <PageFilter active>페이지별 보기</PageFilter>
          <PageFilter>총평 보기</PageFilter>
          <SortButton>최신순 ▼</SortButton>
        </FilterSection>

        <InfoSection>
          <InfoIcon>ⓘ</InfoIcon>
          <InfoText>내 진행도에 따라 읽을 곳을 불러져립니다.</InfoText>
        </InfoSection>

        <InputSection>
          <InputGroup>
            <PageInput
              value={startPage}
              placeholder=""
              readOnly
              onClick={() => handleInputFocus('start')}
              active={activeInput === 'start'}
            />
            <Separator>~</Separator>
            <PageInput
              value={endPage}
              placeholder=""
              readOnly
              onClick={() => handleInputFocus('end')}
              active={activeInput === 'end'}
            />
            <PageLabel>p</PageLabel>
            <ResetButton onClick={handleReset}>
              <img src={refreshIcon} alt="초기화" />
            </ResetButton>
          </InputGroup>
          <ConfirmButton active={isValid} onClick={handleConfirm}>
            ✓
          </ConfirmButton>
        </InputSection>

        {showKeyboard && (
          <Keyboard>
            <KeyboardRow>
              <KeyButton onClick={() => handleNumberClick('1')}>1</KeyButton>
              <KeyButton onClick={() => handleNumberClick('2')}>2</KeyButton>
              <KeyButton onClick={() => handleNumberClick('3')}>3</KeyButton>
              <KeyButton onClick={onClose}>✕</KeyButton>
            </KeyboardRow>
            <KeyboardRow>
              <KeyButton onClick={() => handleNumberClick('4')}>4</KeyButton>
              <KeyButton onClick={() => handleNumberClick('5')}>5</KeyButton>
              <KeyButton onClick={() => handleNumberClick('6')}>6</KeyButton>
              <KeyButton onClick={handleReset}>이동</KeyButton>
            </KeyboardRow>
            <KeyboardRow>
              <KeyButton onClick={() => handleNumberClick('7')}>7</KeyButton>
              <KeyButton onClick={() => handleNumberClick('8')}>8</KeyButton>
              <KeyButton onClick={() => handleNumberClick('9')}>9</KeyButton>
              <KeyButton>-</KeyButton>
            </KeyboardRow>
            <KeyboardRow>
              <KeyButton></KeyButton>
              <KeyButton onClick={() => handleNumberClick('0')}>0</KeyButton>
              <KeyButton></KeyButton>
              <KeyButton></KeyButton>
            </KeyboardRow>
          </Keyboard>
        )}
      </Modal>
    </Overlay>
  );
};

export default PageRangeModal;
