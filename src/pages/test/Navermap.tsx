import { useEffect, useRef } from "react";

interface NaverMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverMap({ latitude = 37.3595704, longitude = 127.105399, zoom = 19 }: NaverMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (latitude && longitude) {
      const { naver } = window;
      if (mapElement.current && naver?.maps) {
        const map = new naver.maps.Map(mapElement.current, {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: zoom,
        });

        new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
        });
      }
    }
  }, [latitude, longitude]);

  return (
    <>
      <div ref={mapElement} style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
}
