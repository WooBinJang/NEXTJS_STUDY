import { NextPage } from 'next';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <>
      <h1>getStaticProps Page</h1>
      <h2>값 : {data}</h2>
    </>
  );
};
export default Example;

export async function getStaticProps() {
  // getStaticProps -> Next 문서를 살펴보면 Development 환경에서는 매 요청마다 GetStaticProps가 실행됨.

  const delayInSeconds = 2;
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000);
  });
  return {
    props: { data },
    revalidate: 5,
    // Revalidate는 ISR ( Incremental Static Regeneration )
    // 해당 페이지만 업데이트하는 것이기 때문에 전체 사이드를 다시 빌드할 필요 X
    // 이 기능을 이용해서 이미 빌드가 완료된 사이트에서 주기적으로 정적인 페이지를 업데이트 가능
    // 5초마다 이 함수를 다시 실행해서 만약 데이터가 바뀌었으면 새로운 값으로 다시 프리렌더링
    // 데이터가 변하지 않으면 Next가 프리 렌더링을 다시 수행하지 않음.
  };
}
// getStaticProps 함수를 'export'하면 그 props를 이용해 해당 'page'를 pre-render 함.
