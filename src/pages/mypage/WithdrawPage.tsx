import TitleHeader from '@/components/common/TitleHeader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePopupActions } from '@/hooks/usePopupActions';
import leftArrow from '../../assets/common/leftArrow.svg';
import withdraw from '@/assets/mypage/withdraw.svg';
import check from '@/assets/mypage/check.svg';
import { deleteUsers } from '@/api/users/deleteUsers';
import {
  Wrapper,
  Container,
  Content,
  ContentTitle,
  ContentText,
  CheckSection,
  CheckboxContainer,
  Checkbox,
  CheckLabel,
  WithdrawButton,
  ButtonText,
} from './WithdrawPage.styled';

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

export default WithdrawPage;
