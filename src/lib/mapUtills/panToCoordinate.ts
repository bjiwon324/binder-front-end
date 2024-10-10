export const panToCoordinate = (
  map: any,
  coordinate: { latitude: number; longitude: number }
) => {
  const latLng = new window.kakao.maps.LatLng(
    coordinate.latitude,
    coordinate.longitude
  );
  map.panTo(latLng);
};

// 맵 중앙 이동시 새로 데이터 불러오기
// useEffect(() => {
//   if (mapRef.current && centerCoordinate.x !== 0) {
//     refetchBinData();
//   }
// }, [centerCoordinate, refetchBinData]);
