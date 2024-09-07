import { getLocation } from "@/lib/apis/geo";
import { useQuery } from "@tanstack/react-query";
import NaverMap from "./Navermap";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { userCoordinate } from "@/lib/atoms/userAtom";
import { useAtom } from "jotai";

export default function Test() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [coordinate, setCoordinate] = useAtom(userCoordinate);

  const { data: locationData } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setCoordinate(locationData[0]);
    }
  }, [locationData]);
  console.log("Location Data:", locationData);
  console.log("Coordinate:", coordinate);

  if (!coordinate) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      {scriptLoaded && !!coordinate && <NaverMap latitude={coordinate.x} longitude={coordinate.y} zoom={16} />}
    </>
  );
}
