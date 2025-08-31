import { apiClient } from '../index';

// 개인적으로 저장한 책 정보 타입
export interface SavedBookInMy {
  bookId: number;
  bookTitle: string;
  authorName: string;
  publisher: string;
  bookImageUrl: string;
  isbn: string;
  isSaved: boolean;
}

// API 응답 데이터 타입
export interface SavedBooksInMyData {
  bookList: SavedBookInMy[];
  nextCursor: string;
  isLast: boolean;
}

// API 응답 타입
export interface SavedBooksInMyResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  data: SavedBooksInMyData;
}

// 개인적으로 저장한 책 목록 조회 API 함수 (무한스크롤)
export const getSavedBooksInMy = async (cursor: string | null = null) => {
  try {
    const params: { cursor?: string | null } = {};
    if (cursor !== null) {
      params.cursor = cursor;
    }

    const response = await apiClient.get<SavedBooksInMyResponse>('/books/saved', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('개인 저장 책 조회 API 오류:', error);
    throw error;
  }
};

/*
// 사용 예시
const savedBooksInMy = await getSavedBooksInMy();
console.log(savedBooksInMy.data.bookList); // 개인 저장 책 목록
console.log(savedBooksInMy.data.bookList[0].bookTitle); // 첫 번째 책 제목
*/
