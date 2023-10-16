import { Fragment, useEffect } from 'react';
import MapSection from '@/components/home/MapSection';
import { Store } from '@/types/store';
import useStores from '@/hooks/useStores';
import Header from '@/components/home/header';
import DetailSection from '@/components/home/DetailSection';

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
      <Header />
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
