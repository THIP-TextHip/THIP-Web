import { useState } from 'react';
import { createFeed, type CreateFeedBody, type CreateFeedResponse } from '@/api/feeds/createFeed';
import { getPresignedUrl, type PresignedUrlRequest } from '@/api/feeds/getPresignedUrl';
import { uploadFileToS3 } from '@/api/feeds/uploadToS3';
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

      if (body.tagList) {
        if (body.tagList.length > 5) {
          openSnackbar({
            message: '태그는 최대 5개까지 입력할 수 있어요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
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

      let uploadedImageUrls: string[] = [];

      if (images && images.length > 0) {
        if (images.length > 3) {
          openSnackbar({
            message: '이미지는 최대 3장까지 업로드할 수 있어요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
        if (images.some(f => f.size === 0)) {
          openSnackbar({
            message: '빈 이미지 파일이 포함되어 있어요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
        const extOk = (name: string) => /\.(jpe?g|png|gif)$/i.test(name);
        if (images.some(f => !extOk(f.name))) {
          openSnackbar({
            message: '파일 형식은 jpg, jpeg, png, gif만 가능해요.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }

        const presignedRequests: PresignedUrlRequest[] = images.map(file => ({
          extension: file.name.split('.').pop()?.toLowerCase() || 'jpg',
          size: file.size,
        }));

        try {
          const presignedResponse = await getPresignedUrl(presignedRequests);

          if (!presignedResponse.isSuccess || !presignedResponse.data) {
            openSnackbar({
              message: presignedResponse.message || 'Presigned URL 발급에 실패했습니다.',
              variant: 'top',
              onClose: closePopup,
            });
            return { success: false as const };
          }

          const uploadPromises = presignedResponse.data.presignedUrls.map(
            async (urlData, index) => {
              const success = await uploadFileToS3(urlData.presignedUrl, images[index]);
              return success ? urlData.fileUrl : null;
            },
          );

          const uploadResults = await Promise.all(uploadPromises);

          if (uploadResults.some(result => result === null)) {
            openSnackbar({
              message: '이미지 업로드 중 오류가 발생했습니다.',
              variant: 'top',
              onClose: closePopup,
            });
            return { success: false as const };
          }

          uploadedImageUrls = uploadResults.filter((url): url is string => url !== null);
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          openSnackbar({
            message: '이미지 업로드 중 오류가 발생했습니다.',
            variant: 'top',
            onClose: closePopup,
          });
          return { success: false as const };
        }
      }

      const feedBody: CreateFeedBody = {
        ...body,
        ...(uploadedImageUrls.length > 0 && { imageUrls: uploadedImageUrls }),
      };

      const res: CreateFeedResponse = await createFeed(feedBody);

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
