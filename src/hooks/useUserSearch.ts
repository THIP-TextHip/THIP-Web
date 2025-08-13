import { useState, useEffect, useCallback } from 'react';
import { getUsers, type UserData } from '@/api/users/getUsers';
import { useDebounce } from './useDebounce';

interface UseUserSearchProps {
  keyword: string;
  size?: number;
  delay?: number;
  isFinalized?: boolean;
}

export const useUserSearch = ({
  keyword,
  size = 10,
  delay = 300,
  isFinalized = false,
}: UseUserSearchProps) => {
  const [userList, setUserList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const debouncedKeyword = useDebounce(keyword, delay);

  const searchUsers = useCallback(
    async (searchKeyword: string, isLoadMore = false) => {
      if (!searchKeyword.trim()) {
        setUserList([]);
        setHasMore(true);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await getUsers({
          keyword: searchKeyword,
          size,
          isFinalized,
        });

        const newUserList = response.data.userList;

        if (isLoadMore) {
          setUserList(prev => [...prev, ...newUserList]);
        } else {
          setUserList(newUserList);
        }

        setHasMore(newUserList.length === size);
      } catch (err) {
        console.error('사용자 검색 실패:', err);
        setError('사용자 검색에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [size, isFinalized],
  );

  // 디바운스된 키워드가 변경될 때 검색 실행
  useEffect(() => {
    searchUsers(debouncedKeyword);
  }, [debouncedKeyword, searchUsers]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && debouncedKeyword.trim()) {
      searchUsers(debouncedKeyword, true);
    }
  }, [loading, hasMore, debouncedKeyword, searchUsers]);

  const clearSearch = useCallback(() => {
    setUserList([]);
    setError(null);
    setHasMore(true);
  }, []);

  return {
    userList,
    loading,
    error,
    hasMore,
    loadMore,
    clearSearch,
  };
};
