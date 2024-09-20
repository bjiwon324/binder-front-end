import { getLocation } from "@/lib/apis/geo";
import { getAroundbins } from "@/lib/apis/search";
import {
  mapCenterCoordinate,
  userAddress,
  userCoordinate,
} from "@/lib/atoms/userAtom";
import { BinItemType } from "@/lib/constants/btnInputValues";
import { useToggle } from "@/lib/hooks/useToggle";
import {
  addMyLocationMarker,
  createMarker,
  filterAddress,
  getAddressFromCoords,
  getMarkerImage,
  initMap,
} from "@/lib/map";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import BinTypeBtnList from "../BinTypeBtnList";
import styles from "./KakaoMap.module.scss";

const cn = classNames.bind(styles);

declare global {
  interface Window {
    kakao: any;
  }
}

const loadKakaoMapScript = (callback: () => void) => {
  if (window.kakao && window.kakao.maps) {
    callback();
  } else {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;

    kakaoMapScript.async = false;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        callback();
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }
};

const initializeMap = (coordinate: any, setAddress: any) => {
  if (window.kakao && window.kakao.maps) {
    const map = initMap(window.kakao, coordinate);
    const myLocationMarker = addMyLocationMarker(map, window.kakao, coordinate);

    getAddressFromCoords(window.kakao, coordinate, (getAddress: any) => {
      setAddress({
        roadAddress:
          filterAddress(getAddress.road_address?.address_name) || null,
        address: getAddress.address?.address_name,
      });
    });

    return { map, myLocationMarker };
  } else {
    return null;
  }
};

const updateMarkers = (binData: any, map: any, binkMarkerRef: any) => {
  if (!!map && binkMarkerRef.current.length > 0) {
    binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
  }

  if (binData && !!map) {
    const newMarkers = binData.map((bin: any) => {
      const marker = createMarker(
        window.kakao,
        map,
        { x: bin.latitude, y: bin.longitude },
        getMarkerImage(bin.isBookMarked, bin.type),
        bin.title
      );
      return marker;
    });
    binkMarkerRef.current = newMarkers;
  }
};

export default function KakaoMap() {
  const [coordinate, setCoordinate] = useAtom(userCoordinate);
  const [, setAddress] = useAtom(userAddress);
  const [binType, setBinType] = useState<null | BinItemType["id"] | undefined>(
    null
  );
  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const binkMarkerRef = useRef<any>([]);
  const [centerCoordinate, setCenterCoordinate] = useAtom(mapCenterCoordinate);
  const [toggleMyLocation, toggleOpen, toggleClose] = useToggle(false);
  const [toggleAroundBin, toggleAroundBinOpen, toggleAroundBinClose] =
    useToggle(false);

  const handleClickSearchBintype = async (
    id: BinItemType["id"] | undefined
  ) => {
    setBinType(id);

    if (binType === id) {
      // 같은 타입의 버튼을 다시 클릭했을 때는 타입을 초기화
      setBinType(null);
      binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
      binkMarkerRef.current = [];
    } else {
      // 선택한 binType에 해당하는 마커 데이터를 즉시 불러오고 업데이트
      try {
        if (centerCoordinate.x !== 0 && centerCoordinate.y !== 0) {
          binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null)); // 기존 마커 제거
          binkMarkerRef.current = [];

          const fetchedBinData = await getAroundbins(
            centerCoordinate.x,
            centerCoordinate.y,
            id!,
            500
          );

          if (fetchedBinData && !!mapRef.current) {
            updateMarkers(fetchedBinData, mapRef.current, binkMarkerRef);
          }
        }
      } catch (error) {
        console.error(
          "주변 쓰레기통 데이터를 불러오는 데 실패했습니다:",
          error
        );
      }
    }
  };

  console.log(binType);
  const { data: locationData, refetch: locationRefetch } = useQuery<any>({
    queryKey: ["locations"],
    queryFn: getLocation,
    gcTime: 3000,
  });

  const { data: binData, refetch: refetchBinData } = useQuery({
    queryKey: ["get-around-bins", binType],
    queryFn: () =>
      getAroundbins(centerCoordinate.x, centerCoordinate.y, binType!, 500),
    enabled: toggleAroundBin && !!centerCoordinate.x && !!centerCoordinate.y,
    gcTime: 3000,
  });
  console.log("ddd", binData);

  //gps로 현위치 불러오기
  useEffect(() => {
    if (locationData && Array.isArray(locationData)) {
      setCoordinate(locationData[0]);
      setCenterCoordinate(locationData[0]);
    }
  }, [locationData]);

  //중앙 좌표값 세팅
  const debouncedHandleCenterChanged = useDebounceCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const newCenterCoordinate = {
        x: center.getLat(),
        y: center.getLng(),
      };
      if (newCenterCoordinate !== centerCoordinate) {
        toggleAroundBinClose();
      }

      if (newCenterCoordinate !== coordinate) {
        toggleClose();
      }
      setCenterCoordinate(newCenterCoordinate);
    }
  }, 500);

  useEffect(() => {
    loadKakaoMapScript(() => {
      if (coordinate.x !== 0 && coordinate.y !== 0) {
        const result = initializeMap(coordinate, setAddress);
        if (result) {
          mapRef.current = result.map;
          myMarkerRef.current = result.myLocationMarker;
          // 맵 중앙 이동시 새로 데이터 불러오기
          // updateMarkers(binData, mapRef.current, binkMarkerRef);

          window.kakao.maps.event.addListener(
            mapRef.current,
            "center_changed",
            debouncedHandleCenterChanged
          );
        }
      } else {
        console.error("Invalid coordinates or Kakao Map API not loaded.");
      }
    });

    return () => {
      if (mapRef.current) {
        binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
        binkMarkerRef.current = [];
      }
    };
  }, [coordinate]);

  //내위치 버튼
  const handelClickGetmyLocation = async () => {
    try {
      const { data: newLocationData } = await locationRefetch();
      if (newLocationData && Array.isArray(newLocationData)) {
        const newCoordinate = newLocationData[0];
        setCoordinate(newCoordinate);
        toggleOpen();

        const newLatLng = new window.kakao.maps.LatLng(
          newCoordinate.x,
          newCoordinate.y
        );
        mapRef.current.panTo(newLatLng);
        myMarkerRef.current.setPosition(newLatLng);

        getAddressFromCoords(window.kakao, newCoordinate, (getAddress: any) => {
          setAddress({
            roadAddress:
              filterAddress(getAddress.road_address?.address_name) || null,
            address: getAddress.address?.address_name,
          });
        });
      }
    } catch (error) {
      console.error("데이터 다시 불러오기 실패:", error);
    }
  };

  // 맵 중앙 이동시 새로 데이터 불러오기
  // useEffect(() => {
  //   if (mapRef.current && centerCoordinate.x !== 0) {
  //     refetchBinData();
  //   }
  // }, [centerCoordinate, refetchBinData]);

  const handelClickGetAroundBinData = async () => {
    try {
      if (centerCoordinate.x !== 0 && centerCoordinate.y !== 0) {
        // 즉각적으로 마커를 지우고 빈 데이터를 로드하기 시작
        binkMarkerRef.current.forEach((marker: any) => marker?.setMap(null));
        binkMarkerRef.current = [];
        toggleAroundBinOpen();
        const fetchedBinData = await getAroundbins(
          centerCoordinate.x,
          centerCoordinate.y,
          binType!,
          500
        );

        if (fetchedBinData) {
          updateMarkers(fetchedBinData, mapRef.current, binkMarkerRef);
        }
      }
    } catch (error) {
      console.error("주변 쓰레기통 데이터를 불러오는 데 실패했습니다:", error);
    }
  };
  return (
    <>
      <BinTypeBtnList binType={binType!} onClick={handleClickSearchBintype} />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          zIndex: "0",
          position: "relative",
        }}
        ref={mapRef}
      ></div>
      <section className={cn("map-wrapper")}>
        <article className={cn("btns-wrapper")}>
          <button
            onClick={() => {
              handelClickGetAroundBinData();
            }}
            className={cn("search-around-bin-btn", toggleAroundBin && "on")}
          >
            <Image
              src={"/images/return.svg"}
              alt="현위치에서 다시 검색하기"
              width={21}
              height={20}
            />
            <p>현 위치에서 검색</p>
          </button>
          <button
            className={
              !toggleMyLocation
                ? cn("my-location-btn")
                : cn("my-location-btn-on")
            }
            onClick={() => {
              handelClickGetmyLocation(); // 함수 호출
            }}
          >
            <Image
              src={"/images/icon-my-lovcationBtn.svg"}
              alt="내 위치 다시 가져오기"
              width={49}
              height={49}
            />
          </button>
        </article>
      </section>
    </>
  );
}
