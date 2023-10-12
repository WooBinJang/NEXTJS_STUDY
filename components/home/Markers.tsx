import useCurrentStore, { CURRENT_STORE_KEY } from '@/hooks/useCurrentStore';
import { MAP_KEY } from '@/hooks/useMap';
import { STORE_KEY } from '@/hooks/useStores';
import { ImageIcon, NaverMap } from '@/types/map';
import { Store } from '@/types/store';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import Marker from './Marker';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);
  // 전역으로 관리하고 있는 데이터 호출

  const { setCurrentStore, clearCurrentStore } = useCurrentStore();
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);

  if (!map || !stores) return null;

  return (
    <div>
      {stores.map((store) => {
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            icon={generateStoreMarkerIcon(store.season, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.nid}
          />
        );
      })}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore}
          key={currentStore.nid}
        />
      )}
    </div>
  );
};

export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALE_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALE_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  return {
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
    size: new naver.maps.Size(SCALE_MARKER_WIDTH, SCALE_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALE_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALE_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALE_MARKER_HEIGHT
    ),
  };
}
