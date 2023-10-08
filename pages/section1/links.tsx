import Link from 'next/link';
import React from 'react';

const links = () => {
  return (
    <main>
      <h1>links</h1>
      <Link href={'/section1/getStaticProps'}>/getStaticProps </Link>
      {/* 
      최초 실행은 SSG로 실행되지만 페이징을 라우팅할 때는 CSR 방식으로 빠르게 이동.
      link를 사용하면 해당 페이지에 대한 정보를 자바스크립트 파일로 미리 가져와서 빠르게 csr 방식으로 JavaScript 파일과 JSON을 결합하여 라우팅할 수 있음.
      페이지마다의 html도 이미 프리렌더링 되어 있기 때문에 seo도 문제 없음.
      viewport에 들어오면 prefetch하여 레이지한 방식으로 파일을 가져옴. ( NEXT는 불필요한 네트워크 요청을 지향 )
      Next 링크가 아닌 A 태그로 자동으로 변환
      */}
    </main>
  );
};

export default links;
