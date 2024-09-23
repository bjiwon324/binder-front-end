import arrow from "@/../public/images/arrowRight.svg";
import location from "@/../public/images/location.svg";
import search from "@/../public/images/search.svg";
import { searchData, searchPrev } from "@/lib/atoms/atom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./SearchInput.module.scss";

const cn = classNames.bind(styles);

interface IFormInput {
  searchData: string;
}

interface SearchType {
  state: string;
  title: string;
  date: string;
}

// API 요청 함수
const getSearch = async (searchInput: string) => {
  try {
    const res = await axios.get(
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
    return [];
  }
};

export default function SearchInput() {
  const [, setSearchPrev] = useAtom(searchPrev);
  const [searchInput, setSearchData] = useAtom(searchData);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setSearchPrev((prev: SearchType[]) => {
      const updatedPrev = prev.filter(
        (item: any) => item.title !== data.searchData
      );
      const dates = new Date();
      const newData = {
        state: "search",
        title: data.searchData,
        date: `${String(dates.getMonth() + 1).padStart(2, "0")}.${String(dates.getDate()).padStart(2, "0")}`,
      };
      return [newData, ...updatedPrev];
    });
  };

  // 디바운스 적용
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 300); // 300ms 디바운스 적용

    return () => {
      clearTimeout(handler); // 검색어 변경 시 이전 타이머 취소
    };
  }, [searchInput]);

  // 리액트 쿼리 사용해서 데이터 요청
  const { data: addresses = [], isFetching: isSearching } = useQuery({
    queryKey: ["searchAddresses", debouncedSearchInput],
    queryFn: () => getSearch(debouncedSearchInput),
    enabled: !!debouncedSearchInput,
    staleTime: 300000, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 포커스 시 재요청 막기
  });

  return (
    <>
      <form className={cn("inputWrap")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("inputInner")}>
          <button>
            <Image src={search} alt="검색버튼" width={15} height={15} />
          </button>
          <input
            {...register("searchData")}
            type="text"
            placeholder="쓰레기통 위치 검색"
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </form>

      {/* {isSearching && <p>검색 중...</p>} */}

      {addresses.length > 0 && (
        <ul className={cn("searchList")}>
          {addresses.map((address: any, index: number) => (
            <li key={index}>
              <Image src={location} alt="위치이미지" width={16} height={19} />
              <p>{address.place_name}</p>
              <Image src={arrow} alt="화살표" width={14} height={14} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
