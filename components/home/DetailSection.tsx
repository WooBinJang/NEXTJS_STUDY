import React, { useState } from 'react';
import styles from '../../styles/detail.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import { Store } from '@/types/store';
import DetailContent from './DetailContent';

const DetailSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);

  return (
    <div
      className={`${styles.detailSection} ${
        currentStore ? styles.selected : ''
      } ${expanded ? styles.expanded : ''}`}
    >
      <div className={styles.header}>
        <button
          onClick={() => {
            setExpanded(!expanded);
          }}
          className={`${styles.arrowButton} ${expanded ? styles.expanded : ''}`}
          disabled={!currentStore}
        >
          <IoIosArrowUp size={20} color="#666" />
        </button>
        {!currentStore && <p className={styles.title}>매장을 선택해주세요</p>}
        {currentStore && <p className={styles.title}>{currentStore.name}</p>}
      </div>

      <DetailContent currentStore={currentStore} expanded={expanded} />
    </div>
  );
};

export default DetailSection;
