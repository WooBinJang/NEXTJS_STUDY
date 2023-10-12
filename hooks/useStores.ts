import { Store } from '@/types/store';
import { useCallback } from 'react';
import { mutate } from 'swr';

export const STORE_KEY = '/stores';

const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    mutate(STORE_KEY, stores);
    // swr 함수
    // mutate : STORE_KEY 키값에 stores 매장 데이터를 전역으로 저장
  }, []);
  return {
    initializeStores,
  };
};
export default useStores;
