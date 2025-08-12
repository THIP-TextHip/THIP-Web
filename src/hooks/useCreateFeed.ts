import { useState } from 'react';
import { createFeed, type CreateFeedRequest } from '@/api/feeds/createFeed';
import { usePopupActions } from './usePopupActions';

interface UseCreateFeedProps {
  onSuccess?: (feedId: number) => void;
}

export const useCreateFeed = (options?: UseCreateFeedProps) => {
  const [loading, setLoading] = useState(false);
  const { openSnackbar, closePopup } = usePopupActions();

  const createNewFeed = async (feedData: CreateFeedRequest) => {
    try {
      setLoading(true);

      const response = await createFeed(feedData);

      if (response.isSuccess) {
        openSnackbar({
          message: '피드가 작성되었습니다.',
          variant: 'top',
          onClose: closePopup,
        });

        // 성공 콜백 호출
        if (options?.onSuccess && response.data?.feedId) {
          options.onSuccess(response.data.feedId);
        }

        return {
          success: true,
          feedId: response.data?.feedId,
        };
      } else {
        openSnackbar({
          message: response.message || '피드 작성에 실패했습니다.',
          variant: 'top',
          onClose: closePopup,
        });

        return {
          success: false,
          error: response.message,
        };
      }
    } catch (error) {
      console.error('피드 작성 실패:', error);

      openSnackbar({
        message: '피드 작성 중 오류가 발생했습니다.',
        variant: 'top',
        onClose: closePopup,
      });

      return {
        success: false,
        error: '피드 작성 중 오류가 발생했습니다.',
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    createNewFeed,
    loading,
  };
};
