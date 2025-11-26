import { apiClient } from '../index';

export interface CategoryData {
  category: string;
  tagList: string[];
}

export interface WriteInfoData {
  categoryList: CategoryData[];
}

export interface GetWriteInfoResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: WriteInfoData;
}

export const getWriteInfo = async () => {
  const response = await apiClient.get<GetWriteInfoResponse>('/feeds/write-info');
  return response.data;
};
