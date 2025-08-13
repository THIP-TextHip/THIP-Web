import { useState } from 'react';
import { createFeed, type CreateFeedBody, type CreateFeedResponse } from '@/api/feeds/createFeed';
import { usePopupActions } from './usePopupActions';

interface UseCreateFeedProps {
  onSuccess?: (feedId: number) => void;
}

export const useCreateFeed = (options?: UseCreateFeedProps) => {
  const [loading, setLoading] = useState(false);
  const { openSnackbar, closePopup } = usePopupActions();

  const createNewFeed = async (body: CreateFeedBody, images?: File[]) => {
    try {
      setLoading(true);

      // ===== 클라이언트 선검증 (선택값일 때만 검사) =====
      if (body.tagList) {
        // 최대 5개
        if (body.tagList.length > 5) {
          openSnackbar({
            message: '태그는 최대 5개까지 입력할 수 있어요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
        // 중복 제거 체크
        const trimmed = body.tagList.map(t => t.trim()).filter(Boolean);
        const uniq = new Set(trimmed);
        if (uniq.size !== trimmed.length) {
          openSnackbar({
            message: '태그는 중복될 수 없어요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
      }

      if (images && images.length > 0) {
        // 최대 3장
        if (images.length > 3) {
          openSnackbar({
            message: '이미지는 최대 3장까지 업로드할 수 있어요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
        // 빈 파일 금지
        if (images.some(f => f.size === 0)) {
          openSnackbar({
            message: '빈 이미지 파일이 포함되어 있어요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
        // 확장자 제한
        const extOk = (name: string) => /\.(jpe?g|png|gif)$/i.test(name);
        if (images.some(f => !extOk(f.name))) {
          openSnackbar({
            message: '파일 형식은 jpg, jpeg, png, gif만 가능해요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
      }
      // ===== 선검증 끝 =====

      const res: CreateFeedResponse = await createFeed(body, images);

      if (res.isSuccess) {
        openSnackbar({
          message: '피드가 작성되었습니다.',
          variant: 'top',
          onClose: closePopup,
        });

        if (options?.onSuccess) {
          options.onSuccess(res.data.feedId);
        }

        return { success: true as const, feedId: res.data.feedId };
      } else {
        openSnackbar({
          message: res.message || '피드 작성에 실패했습니다.',
          variant: 'top',
          onClose: closePopup,
        });
        return { success: false as const, error: res.message };
      }
    } catch (error) {
      console.error('피드 작성 실패:', error);
      openSnackbar({
        message: '피드 작성 중 오류가 발생했습니다.',
        variant: 'top',
        onClose: closePopup,
      });
      return { success: false as const, error: '피드 작성 중 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  };

  return { createNewFeed, loading };
};
