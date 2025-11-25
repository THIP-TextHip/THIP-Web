import { useLocation, useNavigate } from 'react-router-dom';
import TitleHeader from '@/components/common/TitleHeader';
import leftArrow from '@/assets/common/leftArrow.svg';
import { useEffect, useState } from 'react';
import { Wrapper, Container, InputBox, StyledInput, CharCount } from './EditPage.styled';
import type { Genre } from '@/types/genre';
import type { GetMyProfileResponse } from '@/api/users/getMyProfile';
import { patchProfile } from '@/api/users/patchProfile';

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state.profile as GetMyProfileResponse['data'];

  const [nickname, setNickname] = useState<string | null>(null);
  const [currentNickname] = useState(profile.nickname || '');
  const [nicknameError, setNicknameError] = useState('');
  const maxLength = 10;

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;

    fetch('/genres.json')
      .then(res => res.json())
      .then((data: Genre[]) => {
        setGenres(data);
        if (selectedId === null) {
          const matchingGenre = data.find(g => g.subTitle === profile.aliasName);
          if (matchingGenre) {
            setSelectedId(matchingGenre.id);
          }
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {}, [nicknameError]);

  const onLeftClick = () => {
    navigate('/mypage');
  };

  const onRightClick = async () => {
    const selectedGenre = genres.find(g => g.id === selectedId);
    if (!selectedGenre) {
      console.error('선택된 장르를 찾을 수 없습니다.');
      return;
    }

    try {
      const result = await patchProfile({
        nickname: nickname,
        aliasName: selectedGenre.subTitle,
      });

      if (result.isSuccess) {
        navigate('/mypage');
      } else {
        const errorMessage = result.message;
        setNicknameError(errorMessage);
      }
    } catch (error) {
      console.error('프로필 편집 중 오류 발생:', error);
      setNicknameError('프로필 편집에 실패했어요.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^ㄱ-ㅎ가-힣a-z0-9]/g, '');
    setNickname(filteredValue);

    if (nicknameError) {
      setNicknameError('');
    }
  };

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
            value={nickname || ''}
            onChange={handleInputChange}
            maxLength={maxLength}
            hasError={!!nicknameError}
          />
          <CharCount>
            {nickname?.length || 0}/{maxLength}
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
