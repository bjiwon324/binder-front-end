import { filterAddress, getAddressFromCoords } from "./getAddressFromCoords";
import { initMap } from "./initMap";
import { addMyLocationMarker } from "./markers";

export const initializeMap = (coordinate: any, setAddress: any) => {
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
