import { useState } from 'react';
import { updateFeed, type UpdateFeedBody, type UpdateFeedResponse } from '@/api/feeds/updateFeed';
import { usePopupActions } from './usePopupActions';

interface UseUpdateFeedProps {
  onSuccess?: (feedId: number) => void;
}

export const useUpdateFeed = (options?: UseUpdateFeedProps) => {
  const [loading, setLoading] = useState(false);
  const { openSnackbar, closePopup } = usePopupActions();

  const updateExistingFeed = async (feedId: number, body: UpdateFeedBody) => {
    try {
      setLoading(true);

      // ===== 클라이언트 선검증 =====
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
      // ===== 선검증 끝 =====

      const res: UpdateFeedResponse = await updateFeed(feedId, body);

      if (res.isSuccess) {
        openSnackbar({
          message: '피드가 수정되었습니다.',
          variant: 'top',
          onClose: closePopup,
        });

        if (options?.onSuccess) {
          options.onSuccess(feedId);
        }

        return { success: true as const, feedId };
      } else {
        openSnackbar({
          message: res.message || '피드 수정에 실패했습니다.',
          variant: 'top',
          onClose: closePopup,
        });
        return { success: false as const, error: res.message };
      }
    } catch (error) {
      console.error('피드 수정 실패:', error);
      openSnackbar({
        message: '피드 수정 중 오류가 발생했습니다.',
        variant: 'top',
        onClose: closePopup,
      });
      return { success: false as const, error: '피드 수정 중 오류가 발생했습니다.' };
    } finally {
      setLoading(false);
    }
  };

  return { updateExistingFeed, loading };
};
