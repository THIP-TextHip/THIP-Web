import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  min-width: 360px;
  max-width: 767px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 96px 20px 100px 20px;
  box-sizing: border-box;
`;

export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.div`
  color: #fefefe;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #282828;
  border-radius: 12px;
  padding: 12px 16px;
  gap: 12px;
`;

export const SearchIcon = styled.div`
  font-size: 16px;
  color: #888;
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #fefefe;
  font-size: 16px;
  flex: 1;

  &::placeholder {
    color: #888;
    font-size: 16px;
  }
`;

export const GenreButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const GenreButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#3D3D3D' : '#282828')};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: ${({ active }) => (active ? '#FEFEFE' : '#888')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

export const TextAreaBox = styled.div`
  position: relative;
  background-color: #282828;
  border-radius: 12px;
  padding: 12px 16px;
`;

export const TextArea = styled.textarea`
  background: none;
  border: none;
  outline: none;
  color: #fefefe;
  font-size: 16px;
  width: 100%;
  resize: none;
  font-family: inherit;

  &::placeholder {
    color: #888;
    font-size: 16px;
  }
`;

export const CharacterCount = styled.div`
  position: absolute;
  bottom: 12px;
  right: 16px;
  color: #888;
  font-size: 12px;
`;

export const DatePickerContainer = styled.div`
  color: #fefefe;
`;

export const DatePickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateText = styled.span`
  color: #fefefe;
  font-size: 16px;
  font-weight: 500;
`;

export const MemberLimitContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MemberNumber = styled.span`
  color: #fefefe;
  font-size: 32px;
  font-weight: 600;
`;

export const MemberText = styled.span`
  color: #fefefe;
  font-size: 16px;
  font-weight: 400;
`;

export const PrivacyToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PrivacyLabel = styled.span`
  color: #fefefe;
  font-size: 16px;
  font-weight: 500;
`;

export const ToggleSwitch = styled.div<{ active: boolean }>`
  width: 48px;
  height: 28px;
  background-color: ${({ active }) => (active ? '#6868FF' : '#3D3D3D')};
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const ToggleSlider = styled.div<{ active: boolean }>`
  width: 20px;
  height: 20px;
  background-color: #fefefe;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: ${({ active }) => (active ? '24px' : '4px')};
  transition: left 0.3s;
`;
