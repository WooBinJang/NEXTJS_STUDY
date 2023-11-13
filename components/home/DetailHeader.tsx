import React, { useState } from 'react';
import styles from '../../styles/detail.module.scss';
import headerStyles from '../../styles/header.module.scss';
import { IoIosArrowUp } from 'react-icons/io';
import { Store } from '@/types/store';
import { AiOutlineShareAlt } from 'react-icons/ai';
import copy from 'copy-to-clipboard';

interface Props {
  currentStore?: Store;
  expanded: boolean;
  onClickArrow: () => void;
}
const DetailHeader = ({ currentStore, expanded, onClickArrow }: Props) => {
  return (
    <div className={styles.header}>
      <button
        onClick={onClickArrow}
        className={`${styles.arrowButton} ${expanded ? styles.expanded : ''}`}
        disabled={!currentStore}
        aria-label={expanded ? '매장 정보 닫기' : '매장 정보 펼치기'}
      >
        <IoIosArrowUp size={20} color="#666" />
      </button>
      {!currentStore && <p className={styles.title}>매장을 선택해주세요</p>}
      {currentStore && (
        <div className={styles.flexRow}>
          <p className={styles.title}>{currentStore.name}</p>
          <button
            className={headerStyles.box}
            onClick={() => {
              copy(location.origin + '/' + currentStore.name);
            }}
            aria-label="매장 페이지 주소 클립보드 복사"
          >
            <AiOutlineShareAlt size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailHeader;
