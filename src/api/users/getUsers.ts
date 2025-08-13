import { apiClient } from '../index';

export interface UserData {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  aliasName: string;
  aliasColor: string;
  followerCount: number;
}

export interface GetUsersResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: {
    userList: UserData[];
  };
}

export interface GetUsersParams {
  keyword?: string;
  size?: number;
  isFinalized?: boolean;
}

export const getUsers = async (params?: GetUsersParams) => {
  const searchParams = new URLSearchParams();

  if (params?.keyword) {
    searchParams.append('keyword', params.keyword);
  }

  if (params?.size) {
    searchParams.append('size', params.size.toString());
  }

  if (params?.isFinalized !== undefined) {
    searchParams.append('isFinalized', params.isFinalized.toString());
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/users?${queryString}` : '/users';

  const response = await apiClient.get<GetUsersResponse>(url);
  return response.data;
};
