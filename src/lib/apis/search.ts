import { btnInputValues } from "../constants/btnInputValues";
import { instance } from "./axios";

type BinType = (typeof btnInputValues)[number]["id"];

export const getAroundbins = async (
  latitude: number,
  longitude: number,
  type: BinType | null,
  radius = 100
) => {
  try {
    const res = await instance.get("/search/bins", {
      params: {
        longitude,
        latitude,
        radius,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearch = async (searchInput: string) => {
  try {
    const res = await instance.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json`,
      {
        params: {
          query: searchInput,
        },
        headers: {
          Authorization: `KakaoAK 1f8ba81f351f88bb4cd56113f479b984`,
        },
      }
    );
    return res.data.documents;
  } catch (error) {
    console.error("주소 검색 실패:", error);
  }
};
