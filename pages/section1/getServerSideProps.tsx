import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  data: number;
}
const Example: NextPage<Props> = ({ data }) => {
  console.log(data);

  return (
    <>
      <h1>getServerSideProps</h1>
      <p>{data}</p>
    </>
  );
};

export default Example;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // SSR은 빌드 타임에 프리렌더 되는 것이 아니라 리퀘스트 타임 즉 페이지에 들어올때 렌더링 되어 사용자 경험이 좋지 않음
  // 사용자의 인증 정보에 따라 변하는 페이지이거나 페이지가 동쪽으로 변하지만 보안은 중요한 페이지에 getServerSideProps를 사용

  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  console.log(data);

  return {
    props: { data },
  };
};
