import { apiClient } from '../index';

/** 단일 이미지 업로드 성공 시 데이터 */
export interface UploadImageData {
  imageUrl: string;
}

/** 서버 공통 응답 타입 */
export interface UploadImageResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data?: UploadImageData; // 성공 시에만 존재
}

/** 내부 유틸: 허용 확장자 */
const IMAGE_EXT_REGEX = /\.(jpe?g|png|gif)$/i;
/** 가이드 최대 업로드 개수 (서버는 FEED 생성 시 최대 3장 제약) */
export const MAX_IMAGES = 3;

/** 파일 사전 검증: 빈 파일 / 확장자 */
function validateFile(file: File) {
  if (!file || file.size === 0) {
    // 서버 코드 170001과 의미 일치
    throw new Error('업로드하려는 이미지가 비어있습니다.');
  }
  if (!IMAGE_EXT_REGEX.test(file.name)) {
    // 서버 코드 170003과 의미 일치
    throw new Error('파일 형식은 jpg, jpeg, png, gif만 가능합니다.');
  }
}

/** 단일 이미지 업로드 */
export const uploadImage = async (
  file: File,
  options?: { signal?: AbortSignal },
): Promise<UploadImageResponse> => {
  // 사전 검증
  validateFile(file);

  const formData = new FormData();
  // 서버가 단일 업로드에서 기대하는 필드명이 image라면 유지
  formData.append('image', file);

  const { data } = await apiClient.post<UploadImageResponse>('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    signal: options?.signal,
  });

  return data;
};

/**
 * 다중 이미지 업로드
 * - 전부 성공하면 URL 배열 반환
 * - 하나라도 실패하면 실패 내역을 포함해 throw
 */
export const uploadMultipleImages = async (
  files: File[],
  options?: { signal?: AbortSignal; enforceMax?: boolean },
): Promise<string[]> => {
  // 개수 제한(선택) – FEED 생성 정책에 맞춰 사전 차단하고 싶을 때 사용
  if (options?.enforceMax && files.length > MAX_IMAGES) {
    throw new Error(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`);
  }

  // 파일별 사전 검증
  files.forEach(validateFile);

  // 병렬 업로드 (각 요청 독립)
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
    // 어떤 항목이 왜 실패했는지 상세 메시지
    const detail = failures.map(f => `#${f.index + 1}: ${f.reason}`).join(' / ');
    throw new Error(`일부 이미지 업로드에 실패했습니다. (${detail})`);
  }

  return successUrls;
};

/*
사용 예시:

// 단일
try {
  const res = await uploadImage(file);
  if (res.isSuccess) {
    console.log('업로드된 URL:', res.data?.imageUrl);
  } else {
    console.error('실패:', res.message);
  }
} catch (e) {
  console.error('오류:', e);
}

// 다중
try {
  const urls = await uploadMultipleImages(files, { enforceMax: true });
  console.log('업로드된 URL들:', urls);
} catch (e) {
  console.error('다중 업로드 실패:', e);
}
*/
