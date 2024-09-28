// 마커 생성 함수
export const createMarker = (
  kakao: any,
  map: any,
  coordinate: { x: number; y: number },
  imageSrc: string,
  imageSize: { width: number; height: number } = { width: 33, height: 36 }
) => {
  if (!kakao || !kakao.maps.Size) {
    console.error("Kakao maps API is not loaded.");
    return null;
  }

  const markerImageSize = new kakao.maps.Size(
    imageSize.width,
    imageSize.height
  );
  const markerImage = new kakao.maps.MarkerImage(imageSrc, markerImageSize);
  const markerPosition = new kakao.maps.LatLng(coordinate.x, coordinate.y);

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
    map: map,
  });

  return marker;
};

// 마커 제거 함수
export const removeMarker = (marker: any) => {
  if (marker && typeof marker.setMap === "function") {
    marker.setMap(null);
  }
};

// 마커 이미지 가져오는 함수
const getMarkerImage = (isBookMarked: boolean, type: string) => {
  if (isBookMarked) return "/images/icon-marker-favorite.svg";

  const markerImageMap: { [key: string]: string } = {
    GENERAL: "/images/icon-marker-general-bin.svg",
    RECYCLE: "/images/icon-marker-recyle-bin.svg",
    BEVERAGE: "/images/icon-marker-drink-bin.svg",
    CIGAR: "/images/icon-marker-tabacoo.svg",
  };

  return markerImageMap[type] || "/images/icon-marker-general-bin.svg";
};

// 현재 위치 마커 추가 함수
export const addMyLocationMarker = (
  map: any,
  kakao: any,
  coordinate: { x: number; y: number }
) => {
  const myLocationMarkerImage = "/images/icon-marker-my-location.svg";
  const imageSize = { width: 44, height: 44 };

  return createMarker(kakao, map, coordinate, myLocationMarkerImage, imageSize);
};

// 클릭 마커 추가 함수
export const addClickMarker = (
  map: any,
  kakao: any,
  coordinate: { x: number; y: number },
  markerRef: any,
  setMarker: (marker: any) => void
) => {
  markerRef.current.forEach((marker: any) => marker?.setMap(null));

  const clickMarkerImage = "/images/icon-marker-add-bin.svg";
  const imageSize = { width: 81, height: 46 };
  const newMarker = createMarker(
    kakao,
    map,
    coordinate,
    clickMarkerImage,
    imageSize
  );
  newMarker.setDraggable(false);

  setMarker(newMarker);
};

export const updateMarkers = (
  binData: any[],
  map: any,
  handleClickMarker: (id: number) => void,
  markerRef?: any
) => {
  markerRef?.current.forEach((marker: any) => marker?.setMap(null));
  const newMarkers = binData.map((bin: any, index: number) => {
    const markerImage =
      index === 0
        ? "/images/icon-marker-recommend.svg"
        : getMarkerImage(bin.isBookMarked, bin.type);

    const marker = createMarker(
      window.kakao,
      map,
      { x: bin.latitude, y: bin.longitude },
      markerImage
    );

    window.kakao.maps.event.addListener(marker, "click", () => {
      handleClickMarker(bin.id);
    });

    return marker;
  });

  markerRef.current = newMarkers;
};

export const resetAndAddMarkers = (
  map: any,
  markerRef: React.MutableRefObject<any[]>,
  fetchedBinData: any[],
  handleClickMarker: (id: number) => void
) => {
  markerRef.current.forEach((marker: any) => marker?.setMap(null));
  markerRef.current = [];

  updateMarkers(fetchedBinData, map, handleClickMarker, markerRef);
};
