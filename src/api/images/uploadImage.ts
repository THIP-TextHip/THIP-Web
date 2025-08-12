import { apiClient } from '../index';

// 이미지 업로드 응답 데이터 타입
export interface UploadImageData {
  imageUrl: string;
}

// API 응답 타입
export interface UploadImageResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data?: UploadImageData; // 성공 시에만 존재
}

// 단일 이미지 업로드 API 함수
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post<UploadImageResponse>('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// 다중 이미지 업로드 API 함수
export const uploadMultipleImages = async (files: File[]) => {
  const uploadPromises = files.map(file => uploadImage(file));

  try {
    const results = await Promise.all(uploadPromises);

    // 모든 업로드가 성공한 경우에만 URL 반환
    const successResults = results.filter(result => result.isSuccess);

    if (successResults.length !== files.length) {
      throw new Error('일부 이미지 업로드에 실패했습니다.');
    }

    return successResults.map(result => result.data!.imageUrl);
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};

/*
사용 방법:

// 단일 이미지 업로드
try {
  const result = await uploadImage(file);
  if (result.isSuccess) {
    console.log('업로드된 이미지 URL:', result.data?.imageUrl);
  }
} catch (error) {
  console.error('이미지 업로드 실패:', error);
}

// 다중 이미지 업로드
try {
  const imageUrls = await uploadMultipleImages(files);
  console.log('업로드된 이미지 URLs:', imageUrls);
} catch (error) {
  console.error('다중 이미지 업로드 실패:', error);
}
*/
