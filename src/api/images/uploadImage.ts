import { apiClient } from '../index';

export interface UploadImageData {
  imageUrl: string;
}

export interface UploadImageResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data?: UploadImageData;
}

const IMAGE_EXT_REGEX = /\.(jpe?g|png|gif)$/i;
export const MAX_IMAGES = 3;

function validateFile(file: File) {
  if (!file || file.size === 0) {
    throw new Error('업로드하려는 이미지가 비어있습니다.');
  }
  if (!IMAGE_EXT_REGEX.test(file.name)) {
    throw new Error('파일 형식은 jpg, jpeg, png, gif만 가능합니다.');
  }
}

export const uploadImage = async (
  file: File,
  options?: { signal?: AbortSignal },
): Promise<UploadImageResponse> => {
  validateFile(file);

  const formData = new FormData();
  formData.append('image', file);

  const { data } = await apiClient.post<UploadImageResponse>('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    signal: options?.signal,
  });

  return data;
};

export const uploadMultipleImages = async (
  files: File[],
  options?: { signal?: AbortSignal; enforceMax?: boolean },
): Promise<string[]> => {
  if (options?.enforceMax && files.length > MAX_IMAGES) {
    throw new Error(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`);
  }

  files.forEach(validateFile);

  const results = await Promise.allSettled(
    files.map(file => uploadImage(file, { signal: options?.signal })),
  );

  const successUrls: string[] = [];
  const failures: { index: number; reason: string }[] = [];

  results.forEach((res, idx) => {
    if (res.status === 'fulfilled') {
      const value = res.value;
      if (value.isSuccess && value.data?.imageUrl) {
        successUrls.push(value.data.imageUrl);
      } else {
        failures.push({
          index: idx,
          reason: value.message || '파일 업로드에 실패하였습니다.',
        });
      }
    } else {
      failures.push({
        index: idx,
        reason: (res.reason as Error)?.message || '네트워크 오류로 파일 업로드에 실패하였습니다.',
      });
    }
  });

  if (failures.length > 0) {
    const detail = failures.map(f => `#${f.index + 1}: ${f.reason}`).join(' / ');
    throw new Error(`일부 이미지 업로드에 실패했습니다. (${detail})`);
  }

  return successUrls;
};
