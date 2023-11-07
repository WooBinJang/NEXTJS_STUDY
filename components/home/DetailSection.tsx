import React, { useState } from 'react';
import styles from '../../styles/detail.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import useSWR from 'swr';
import { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import { Store } from '@/types/store';
import DetailContent from './DetailContent';
import DetailHeader from './DetailHeader';

const DetailSection = () => {
  const [expanded, setExpanded] = useState(false);
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);

  return (
    <div
      className={`${styles.detailSection} ${
        currentStore ? styles.selected : ''
      } ${expanded ? styles.expanded : ''}`}
    >
      <DetailHeader
        currentStore={currentStore}
        expanded={expanded}
        onClickArrow={() => {
          setExpanded(!expanded);
        }}
      />

      <DetailContent currentStore={currentStore} expanded={expanded} />
    </div>
  );
};

export default DetailSection;
