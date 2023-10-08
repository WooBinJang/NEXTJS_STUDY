import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const useRouterExample = () => {
  const router = useRouter();
  /* 
  useRouter는 Next Link를 대체할 수 있음.
  하지만 Next Link와 다르게 viewport에 들어온다고 바로 JavaScript와 JSON를 자동으로 프리 패치하지 않아 
  프리 패치 하기 위해서는 개발자가 직접 코드를 구현해야 합니다. (useEffect)
  프리 패치를 자동으로 해주지 않기 때문에 특별한 경우가 아니라면 Next Link 사용 권장
  */

  useEffect(() => {
    router.prefetch('/section1/getStaticProps');
  }, [router]);
  // 프리 패치 구현

  return (
    <main>
      <h1>router</h1>
      <button
        onClick={() => {
          router.push('/section1/getStaticProps');
        }}
      >
        /getStaticProps
      </button>
    </main>
  );
};

export default useRouterExample;
