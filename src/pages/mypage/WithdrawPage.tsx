import TitleHeader from '@/components/common/TitleHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePopupActions } from '@/hooks/usePopupActions';
import styled from '@emotion/styled';
import { colors, typography } from '@/styles/global/global';
import leftArrow from '../../assets/common/leftArrow.svg';
import withdraw from '@/assets/mypage/withdraw.svg';
import check from '@/assets/mypage/check.svg';
import { deleteUsers } from '@/api/users/deleteUsers';

const WithdrawPage = () => {
  const navigate = useNavigate();
  const { openConfirm, closePopup, openSnackbar } = usePopupActions();
  const [isChecked, setIsChecked] = useState(false);

  const handleBack = () => {
    navigate('/mypage');
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleWithdraw = () => {
    if (isChecked) {
      openConfirm({
        title: '정말 탈퇴하시겠어요?',
        disc: "'예'를 누르면 Thip에서의 모든 기록이 사라져요",
        onConfirm: () => {
          void (async () => {
            try {
              const response = await deleteUsers();
              if (response.isSuccess) {
                closePopup();
                navigate('/mypage/withdraw/done');
                localStorage.removeItem('authToken');
              } else {
                closePopup();
                openSnackbar({
                  message: response.message,
                  variant: 'top',
                  onClose: () => {},
                });
              }
            } catch (error) {
              let serverMessage = '요청 처리 중 오류가 발생했어요.';
              if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                serverMessage = axiosError.response?.data?.message || serverMessage;
              }
              closePopup();
              openSnackbar({
                message: serverMessage,
                variant: 'top',
                onClose: () => {},
              });
            }
          })();
        },
        onClose: () => {
          closePopup();
        },
      });
    }
  };

  return (
    <Wrapper>
      <TitleHeader
        title="회원탈퇴"
        leftIcon={<img src={leftArrow} alt="뒤로가기" />}
        onLeftClick={handleBack}
      />
      <Container>
        <Content>
          <ContentTitle>회원탈퇴 주의사항</ContentTitle>
          <ContentText>
            회원탈퇴 시 계정 및 활동 데이터는 <span className="danger">즉시 삭제</span>되며,
            <span className="danger"> 복구가 불가능</span>합니다.
          </ContentText>
          <ContentText>백업 및 로그 역시 보안 저장 후 최대 90일 내 자동 삭제됩니다.</ContentText>
          <ContentText>법령상 보존 의무가 있는 정보는 해당 기간 동안 보관됩니다.</ContentText>
        </Content>
        <CheckSection>
          <CheckboxContainer onClick={handleCheckboxChange}>
            <CheckLabel>주의사항을 이해하였으며 이에 동의합니다.</CheckLabel>
            <Checkbox checked={isChecked}>{isChecked && <img src={check} />}</Checkbox>
          </CheckboxContainer>
        </CheckSection>
      </Container>
      <WithdrawButton isActive={isChecked} onClick={handleWithdraw}>
        <img src={withdraw} alt="회원탈퇴" />
        <ButtonText>Thip 떠나기</ButtonText>
      </WithdrawButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 767px;
  height: 100vh;
  margin: 0 auto;
  padding-top: 76px;
  background-color: #121212;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 320px;
  max-width: 540px;
  gap: 30px;
  padding: 40px 20px 105px 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${colors.darkgrey.dark};
`;

const ContentTitle = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  line-height: 24px;
`;

const ContentText = styled.div`
  color: ${colors.grey[200]};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 20px;

  .danger {
    color: #ff9496;
  }
`;

const CheckSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const Checkbox = styled.div<{ checked: boolean }>`
  width: 30px;
  height: 30px;
  border: 2px solid ${colors.grey[200]};
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

const CheckLabel = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 24px;
`;

const WithdrawButton = styled.div<{ isActive: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 8px;
  width: 100%;
  max-width: 767px;
  min-width: 320px;
  height: 50px;
  background-color: ${props => (props.isActive ? colors.purple.main : colors.grey[300])};
  cursor: ${props => (props.isActive ? 'pointer' : 'not-allowed')};
  z-index: 2000;
`;

const ButtonText = styled.div`
  color: ${colors.white};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.regular};
  line-height: 24px;
`;
export default WithdrawPage;
