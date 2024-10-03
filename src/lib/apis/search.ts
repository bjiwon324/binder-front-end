import { btnInputValues } from "../constants/btnInputValues";
import { instance } from "./axios";

type BinType = (typeof btnInputValues)[number]["id"];

const key = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;

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
        withCredentials: false,
      }
    );
    return res.data.documents;
  } catch (error) {
    console.error("주소 검색 실패:", error);
  }
};
export const getSearchKeyword = async (
  longitude: number,
  latitude: number,
  targetLongitude: number,
  targetLatitude: number,
  keyword: string,
  address: string
) => {
  try {
    const res = await instance.get(
      `/search/bins/keyword?longitude=${longitude}&latitude=${latitude}&targetLongitude=${targetLongitude}&targetLatitude=${targetLatitude}&keyword=${keyword}&address=${address}`
    );
    return res.data;
  } catch (error) {
    console.error("키워드 검색 실패:", error);
  }
};

export const prevSearch = async (lastId: number) => {
  try {
    if (lastId !== 0) {
      const res = await instance.get(`/searchlog?lastSearchLogId=${lastId}`);
      return res.data;
    } else {
      const res = await instance.get(`/searchlog`);
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};
export const deleteSearch = async (id: number) => {
  try {
    const res = await instance.delete(`/searchlog/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
