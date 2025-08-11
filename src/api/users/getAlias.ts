import { apiClient } from '../index';

export interface AliasChoice {
  aliasName: string;
  categoryName: string;
  imageUrl: string;
  color: string;
}

export interface GetAliasResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    aliasChoices: AliasChoice[];
  };
}

export const getAlias = async (): Promise<GetAliasResponse> => {
  const response = await apiClient.get<GetAliasResponse>('/users/alias');
  return response.data;
};
