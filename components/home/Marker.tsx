import { Marker, NaverMap } from '@/types/map';
import { Coordinates } from '@/types/store';
import React, { useEffect } from 'react';

const Marker = ({ map, coordinates, icon, onClick }: Marker) => {
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });
    }

    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
      //  naver marker 오버레이를 지도에서 제거하는 역할
    };
  }, [map]);

  return <div></div>;
};

export default Marker;
