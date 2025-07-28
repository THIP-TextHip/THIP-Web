import { useNavigate } from 'react-router-dom';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '@/assets/common/leftArrow.svg';
import { useEffect, useState } from 'react';
import { Wrapper, Container, InputBox, StyledInput, CharCount } from './EditPage.styled';
import type { Genre } from '@/types/genre';

const EditPage = () => {
  const navigate = useNavigate();
  const onLeftClick = () => {
    navigate('/mypage');
  };
  const onRightClick = () => {
    // 닉네임 유효성 검사
    if (nickname.trim() === '') {
      setNicknameError('변경할 닉네임을 입력해주세요.');
      return;
    }

    if (nickname === currentNickname) {
      setNicknameError('현재 닉네임과 동일합니다.');
      return;
    }

    // 에러가 없으면 서버에 요청
    setNicknameError('');
    console.log('편집완료', { nickname, genreId: selectedId });
  };
  const [nickname, setNickname] = useState('');
  const [currentNickname] = useState('문학하는고래'); // 서버에서 받아온 현재 닉네임
  const [nicknameError, setNicknameError] = useState('');
  const maxLength = 10;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, '');
    setNickname(filteredValue);

    // 입력이 변경되면 에러 상태 초기화
    if (nicknameError) {
      setNicknameError('');
    }
  };
  const currentGenreId = 'literature'; // 임시 하드코딩

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>('currentGenreId');

  useEffect(() => {
    fetch('/genres.json')
      .then(res => res.json())
      .then((data: Genre[]) => {
        setGenres(data);
        // 서버에서 받아온 현재 장르 ID로 선택 상태 설정
        setSelectedId(currentGenreId);
      })
      .catch(console.error);
  }, [currentGenreId]);

  return (
    <Wrapper>
      <TitleHeader
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={onLeftClick}
        title="프로필 편집"
        onRightClick={onRightClick}
        isNextActive={true}
        rightButton={<div>완료</div>}
      />
      <Container>
        <div className="title">닉네임 변경</div>
        <InputBox hasError={!!nicknameError}>
          <StyledInput
            type="text"
            placeholder={currentNickname}
            value={nickname}
            onChange={handleInputChange}
            maxLength={maxLength}
            hasError={!!nicknameError}
          />
          <CharCount>
            {nickname.length}/{maxLength}
          </CharCount>
        </InputBox>
        {nicknameError && <div className="errorMessage">{nicknameError}</div>}
      </Container>
      <Container>
        <div className="title">칭호편집</div>
        <div className="subtitle">장르는 칭호와 연결돼요.</div>
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
    </Wrapper>
  );
};

export default EditPage;
