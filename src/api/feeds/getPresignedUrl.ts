import { apiClient } from '../index';

export interface PresignedUrlRequest {
  extension: string;
  size: number;
}

export interface PresignedUrlResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data?: {
    presignedUrls: Array<{
      presignedUrl: string;
      fileUrl: string;
    }>;
  };
}

export const getPresignedUrl = async (
  requests: PresignedUrlRequest[]
): Promise<PresignedUrlResponse> => {
  const { data } = await apiClient.post<PresignedUrlResponse>(
    '/feeds/images/presigned-url',
    requests
  );
  
  return data;
};