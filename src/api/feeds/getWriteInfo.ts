import { apiClient } from '../index';

// 카테고리 및 태그 데이터 타입
export interface CategoryData {
  category: string;
  tagList: string[];
}

// API 응답 데이터 타입
export interface WriteInfoData {
  categoryList: CategoryData[];
}

// API 응답 타입
export interface GetWriteInfoResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: WriteInfoData;
}

// 새 글 작성을 위한 카테고리 및 태그 조회 API 함수
export const getWriteInfo = async () => {
  const response = await apiClient.get<GetWriteInfoResponse>('/feeds/write-info');
  return response.data;
};

/*
사용 예시:
const writeInfo = await getWriteInfo();
console.log(writeInfo.data.categoryList); // CategoryData[]

// 카테고리별 태그 접근
writeInfo.data.categoryList.forEach(category => {
  console.log(`카테고리: ${category.category}`);
  console.log(`태그: ${category.tagList.join(', ')}`);
});
*/
