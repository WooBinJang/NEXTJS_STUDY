import { Fragment, useEffect } from 'react';
import MapSection from '@/components/home/MapSection';
import { Store } from '@/types/store';
import useStores from '@/hooks/useStores';
import DetailSection from '@/components/home/DetailSection';
import { NextSeo } from 'next-seo';
import HomeHeader from '@/components/home/Header';

interface Props {
  stores: Store[];
}
export default function Home({ stores }: Props) {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <NextSeo
        title="매장 지도"
        description="Next.js 시작하기 강의를 위한 매장 지도 서비스입니다."
      />
      <HomeHeader />
      <main
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
