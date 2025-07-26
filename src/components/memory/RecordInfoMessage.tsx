import { Container, InfoIcon, InfoText } from './RecordInfoMessage.styled';
import infoIcon from '../../assets/memory/info.svg';

const RecordInfoMessage = () => {
  return (
    <Container>
      <InfoIcon>
        <img src={infoIcon} alt="정보" />
      </InfoIcon>
      <InfoText>내 진행도에 따라 일부 댓글은 블러처리됩니다.</InfoText>
    </Container>
  );
};

export default RecordInfoMessage;
