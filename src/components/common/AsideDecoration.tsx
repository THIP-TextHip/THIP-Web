import asideSvg from '@/assets/common/aside.svg';
import { Wrapper } from './AsideDecoration.styled';

const AsideDecoration = () => {
  return (
    <Wrapper aria-hidden="true">
      <img src={asideSvg} alt="QR플로팅 이미지" />
    </Wrapper>
  );
};

export default AsideDecoration;
