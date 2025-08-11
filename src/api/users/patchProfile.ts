import { apiClient } from '../index';

export interface PatchProfileRequest {
  nickname: string | null;
  aliasName: string;
}

export interface PatchProfileResponse {
  isSuccess?: boolean;
  code: number;
  message: string;
}

export const patchProfile = async (data: PatchProfileRequest): Promise<PatchProfileResponse> => {
  try {
    const response = await apiClient.patch<PatchProfileResponse>('/users', data);
    return response.data;
  } catch (error) {
    let errorMessage = '프로필 편집 중 오류가 발생했어요.';
    let errorCode = 0;

    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { code?: number; message?: string } } };
      if (axiosError.response?.data) {
        const serverData = axiosError.response.data;
        errorCode = serverData.code || 0;

        switch (errorCode) {
          case 70004:
            errorMessage = '현재 닉네임과 같은 닉네임이에요.';
            break;
          case 70005:
            errorMessage = '닉네임은 6개월에 한번 변경할 수 있어요.';
            break;
          case 70006:
            errorMessage = '이미 사용중인 닉네임이에요.';
            break;
          default:
            errorMessage = serverData.message || '프로필 편집에 실패했어요.';
        }
      }
    }

    return {
      isSuccess: false,
      code: errorCode,
      message: errorMessage,
    };
  }
};
