import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './Signup.styled';
import leftarrow from '../../assets/leftArrow.svg';
import TitleHeader from '../../components/common/TitleHeader';

interface Genre {
  id: string;
  title: string;
  subTitle: string;
  iconUrl: string;
  color: string;
}

const SignupGenre = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/genres.json')
      .then(res => res.json())
      .then((data: Genre[]) => setGenres(data))
      .catch(console.error);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNextClick = () => {
    if (!selectedId) return;
    navigate('/signupdone', { state: { genreId: selectedId } });
  };

  return (
    <>
      <TitleHeader
        leftIcon={<img src={leftarrow} alt="뒤로가기" />}
        title="설정 2/2"
        rightButton={<div className="next">다음</div>}
        onLeftClick={handleBackClick}
        onRightClick={handleNextClick}
        isNextActive={!!selectedId}
      />
      <Container>
        <div className="title">관심있는 장르를 선택해주세요.</div>
        <div className="subtitle">이후 마이페이지에서 변경이 가능해요.</div>
        <div className="notice">아래에서 하나를 선택해주세요.</div>
        <div className="genreGrid">
          {genres.map(g => (
            <div
              key={g.id}
              className={`genreCard ${g.id === selectedId ? 'active' : ''}`}
              onClick={() => setSelectedId(g.id)}
            >
              <img className="bg" src={g.iconUrl} alt={g.title} />
              <div className="textbox">
                <div className="genreTitle">{g.title}</div>
                <div className="genreSub" style={{ color: g.color }}>
                  {g.subTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default SignupGenre;
