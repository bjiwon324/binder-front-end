import { fetchAddressFromCoords } from "./getAddressFromCoords";
import { initMap } from "./initMap";
import { addMyLocationMarker } from "./markers";

export const initializeMap = (
  coordinate: any,
  setAddress: any,
  isSearch = false
) => {
  if (window.kakao && window.kakao.maps) {
    const map = initMap(window.kakao, coordinate);

    const myLocationMarker = addMyLocationMarker(map, window.kakao, coordinate);
    fetchAddressFromCoords(coordinate, setAddress);

    return { map, myLocationMarker };
  } else {
    return null;
  }
};
