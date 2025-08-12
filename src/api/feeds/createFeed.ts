import { apiClient } from '../index';

// 피드 작성 요청 바디 타입
export interface CreateFeedRequest {
  request: {
    isbn: string;
    contentBody: string;
    isPublic: boolean;
    tagList: string[];
  };
  images: string[]; // 이미지 URL들의 배열 (별도로 업로드된 이미지 URL들)
}

// 피드 작성 응답 데이터 타입
export interface CreateFeedData {
  feedId: number;
}

// API 응답 타입
export interface CreateFeedResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data?: CreateFeedData; // 성공 시에만 존재
}

// 피드 작성 API 함수
export const createFeed = async (feedData: CreateFeedRequest) => {
  const response = await apiClient.post<CreateFeedResponse>('/feeds', feedData);
  return response.data;
};

/*
사용 방법:

const feedData: CreateFeedRequest = {
  request: {
    isbn: "9780306406157",
    contentBody: "이 책은 정말 좋습니다!",
    isPublic: true,
    tagList: ["한국소설", "외국소설", "AI"]
  },
  images: ["string"] // 업로드된 이미지 URL들
};

try {
  const result = await createFeed(feedData);
  if (result.isSuccess) {
    console.log('피드 작성 성공:', result.data?.feedId);
    // 성공 처리 로직
  } else {
    console.log('피드 작성 실패:', result.message);
    // 실패 처리 로직
  }
} catch (error) {
  console.error('API 호출 오류:', error);
  // 에러 처리 로직
}
*/
