import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import { Coordinates } from '@/types/store';
import Script from 'next/script';

import React, { useEffect, useRef } from 'react';

interface Props {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
}
const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    // mapId를 공유하는 div 태그에 네이버 지도 UI가 삽입

    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
      // map 컴포넌트가 언마운트 될때 맵 인스턴스 삭제
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        // afterInteractive = 페이지가 로드 되자마자 보여야 될 경우 (default)
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        // onLoad={initializeMap}
        // onLoad 같은 경우 스크립트가 로딩 되었을 때 한번만 실행 (다른 페이지 이동 후 다시 돌아올 경우 script가 실행 되지 않아 지도가 노출 되지 않음)
        onReady={initializeMap}
        // script가 마운트 될 때마다 실행
      />
      <div id={mapId} style={{ width: '100%', height: '100%' }} />
    </>
  );
};

export default Map;
