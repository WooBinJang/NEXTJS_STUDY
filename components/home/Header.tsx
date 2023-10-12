import React, { useCallback } from 'react';
import Header from '../common/Header';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import styles from '../../styles/header.module.scss';
import useMap from '@/hooks/useMap';
import { useRouter } from 'next/navigation';
import copy from 'copy-to-clipboard';

const HomeHeader = () => {
  const { getMapOptions, resetMapOptions } = useMap();

  const router = useRouter();

  const replaceAndCopyUrl = useCallback(() => {
    const mapOption = getMapOptions();
    const query = `/?zoom=${mapOption.zoom}&lat=${mapOption.center[0]}&lng=${mapOption.center[1]}`;

    router.replace(query);
  }, [router, getMapOptions]);

  return (
    <Header
      onClickLogo={resetMapOptions}
      rightElements={[
        <button
          onClick={replaceAndCopyUrl}
          className={styles.box}
          style={{ marginRight: 8 }}
          key="button"
        >
          <AiOutlineShareAlt size={20} />
        </button>,
        <Link href="/feedback" className={styles.box} key="link">
          <VscFeedback size={20} />
        </Link>,
      ]}
    />
  );
};

export default HomeHeader;
