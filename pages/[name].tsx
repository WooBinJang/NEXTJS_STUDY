import DetailContent from '@/components/home/DetailContent';
import DetailHeader from '@/components/home/DetailHeader';
import useCurrentStore from '@/hooks/useCurrentStore';
import { Store } from '@/types/store';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/detail.module.scss';

interface Props {
  store: Store;
}
const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;

  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const gotoMap = () => {
    setCurrentStore(store);
    router.push(
      `/?zoom15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}`
    );
  };
  // fallback = true 시 로딩페이지 렌더링
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      className={`${styles.detailSection} ${styles.selected} ${styles.expanded}`}
    >
      <DetailHeader
        currentStore={store}
        expanded={expanded}
        onClickArrow={gotoMap}
      />

      <DetailContent currentStore={store} expanded={expanded} />
    </div>
  );
};
export default StoreDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: true };
  /*
  getStaticPaths 페이지의 경로를 정적으로 생성 ( 빌드 타임 동작 )
  빌드 후 새로운 데이터 추가 될 경우 다시 빌드 -> 비효율적
  fallback 옵션으로 처리
  false : 빌드 타입의 모든 경로 생성 없는 경로 시 404 페이지 렌더

  true : 빌드 타입의 모든 경로 생성 없는 경로 시 바로 404페이지 렌더하지 않고 getStaticProps를 호출
         많은 데이터 존재 시모든 데이터를 빌드타임에 프리렌더링 하는 것은 부담이기에 최소한의 경로만 미리 생성 후 fallback true 주어 유저가 접근할때  경로생성
         DB에 새로 추가되는 경우 빌드 타임에 프리렌더링 할 수 없기에 fallback true
         한 사람이 최초로 경로를 만들면 그 다음 사람부터는 또다시 GetStaticProps를 호출하는 것이 아니라 이미 프리렌더링 된 HTML을 바로 받을 수 있음
         즉 getStaticProps는 첫 사용자가 접근했을 때만 호출 후 그 다음부턴 프리렌더링 된 페이지로 빠르게 접근 가능

  
  blocking : fallback true 와 유사하게 작동 없는 경로 시 바로 404페이지 렌더하지 않고 getStaticProps를 호출
             blocking은 말 그대로 getStaticProps 함수가 리턴될 때까지 ui를 가만히 유지
            사람이 최초로 경로를 만들면 그 다음 사람부터는 또다시 GetStaticProps를 호출하는 것이 아니라 이미 프리렌더링 된 HTML을 바로 받을 수 있음
            즉 getStaticProps는 첫 사용자가 접근했을 때만 호출 후 그 다음부턴 프리렌더링 된 페이지로 빠르게 접근 가능 ( fallback true 동일)

  */
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  // fallback = true 시 예외 처리
  // if (!store) {
  //   return {
  //     notFound: true, // 404 page
  //   };
  // }

  return { props: { store } };
};
