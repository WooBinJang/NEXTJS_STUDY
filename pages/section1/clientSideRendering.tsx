import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// import NoSSR from '@/components/section1/NoSSR';
const NoSSR = dynamic(() => import('../../components/section1/NoSSR'), {
  ssr: false,
});
// Next에서 WebAPI 접근 시 백엔드단에서 접근이 불가하니 dynamic을 사용

const Example: NextPage = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const delayInSeconds = 2;
    new Promise<number>((resolve) => {
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000);
    }).then((result) => setData(result));
  }, []);

  return (
    <div>
      <h1>clientSideRendering</h1>
      <p> 값 : {data}</p>
      <h1>NoSSR</h1>
      <NoSSR />
    </div>
  );
};

export default Example;
