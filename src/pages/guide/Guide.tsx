import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import guide1 from '@/assets/signup/guide1.svg';
import guide2 from '@/assets/signup/guide2.svg';
import guide3 from '@/assets/signup/guide3.svg';
import guide4 from '@/assets/signup/guide4.svg';
import guide5 from '@/assets/signup/guide5.svg';
import guide6 from '@/assets/signup/guide6.svg';

import {
  Container,
  Header,
  Content,
  Title,
  TitleText,
  Description,
  MockupContainer,
  BottomSection,
  Indicators,
  Indicator,
  SkipButton,
} from './Guide.styled';

interface GuideStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Guide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nickname = location.state?.nickname || '사용자';
  const aliasName = location.state?.aliasName || '독서가';
  const aliasColor = location.state?.aliasColor;
  const aliasIconUrl = location.state?.aliasIconUrl;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (isRightSwipe && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, currentStep]);

  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || mouseStart === null) return;

    const distance = mouseStart - e.clientX;
    if (Math.abs(distance) > 50) {
      if (distance > 0 && currentStep < guideSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else if (distance < 0 && currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
      setIsDragging(false);
      setMouseStart(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setMouseStart(null);
  };

  const guideSteps: GuideStep[] = [
    {
      id: 1,
      title: '피드',
      description: '피드에서 책과 독서에 대한 생각을<br/>자유롭게 나누어보세요!',
      image: guide1,
    },
    {
      id: 2,
      title: '피드',
      description:
        "칭호를 통해 내 독서 취향을 드러내고,<br/>마음에 드는 유저를 '띱'하고 감상을 공유해보세요!",
      image: guide2,
    },
    {
      id: 3,
      title: '모임',
      description: '모임방에서는 글은 물론 투표 기능을 통해<br/>감상과 의견을 나눌 수 있어요.',
      image: guide3,
    },
    {
      id: 4,
      title: '모임',
      description:
        '읽고 싶은 책으로 나만의 독서 모임을 만들고,<br/>독서메이트와 함께 기록을 나눌 수 있어요. ',
      image: guide4,
    },
    {
      id: 5,
      title: 'Thip+',
      description:
        '기록은 자유롭게, 감상은 방해없이.<br/>읽지 않은 페이지에 대한 기록은<br/>블라인드되어 스포일러 걱정없이 몰입할 수 있어요.',
      image: guide5,
    },
    {
      id: 6,
      title: 'Thip+',
      description: "모임방의 인상깊은 기록을<br/>'핀하기'로 피드에 다시 공유해보세요.",
      image: guide6,
    },
  ];

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/signup/done', {
        state: {
          nickName: nickname,
          aliasName: aliasName,
          aliasColor: aliasColor,
          aliasIconUrl: aliasIconUrl,
        },
      });
    }
  };

  const handleSkip = () => {
    navigate('/signup/done', {
      state: {
        nickName: nickname,
        aliasName: aliasName,
        aliasColor: aliasColor,
        aliasIconUrl: aliasIconUrl,
      },
    });
  };

  const handleIndicatorClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <Container
      ref={containerRef}
      isDragging={isDragging}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Header active={currentStep === guideSteps.length - 1} onClick={e => e.stopPropagation()}>
        <div className="next-button" onClick={handleNext}>
          다음
        </div>
      </Header>

      <Content>
        <Title>
          <TitleText>{guideSteps[currentStep].title}</TitleText>
          <Description dangerouslySetInnerHTML={{ __html: guideSteps[currentStep].description }} />
        </Title>
        <MockupContainer>
          <img src={guideSteps[currentStep].image} alt={guideSteps[currentStep].title} />
        </MockupContainer>
        <BottomSection>
          <Indicators>
            {guideSteps.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentStep}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </Indicators>
          <SkipButton onClick={handleSkip}>건너뛰기</SkipButton>
        </BottomSection>
      </Content>
    </Container>
  );
};

export default Guide;
