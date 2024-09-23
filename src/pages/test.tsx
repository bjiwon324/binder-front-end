import axios from "axios";
import { useEffect, useState } from "react";

export default function CustomAddressForm() {
  const [searchInput, setSearchInput] = useState(""); // 검색어 입력
  const [addresses, setAddresses] = useState([]); // 검색 결과
  const [isSearching, setIsSearching] = useState(false); // 로딩 상태

  // 검색어가 변경될 때마다 API 호출
  useEffect(() => {
    if (searchInput.trim() === "") {
      setAddresses([]); // 검색어가 없으면 결과 초기화
      return;
    }

    const fetchAddresses = async () => {
      setIsSearching(true); // 검색 중 표시
      try {
        const response = await axios.get(
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
        setAddresses(response.data.documents); // 검색 결과 설정
      } catch (error) {
        console.error("주소 검색 실패:", error);
      } finally {
        setIsSearching(false); // 검색 완료 후 로딩 종료
      }
    };

    const debounce = setTimeout(fetchAddresses, 300); // 디바운스 적용 (300ms 지연)

    return () => clearTimeout(debounce); // 검색어 변경 시 기존 요청 취소
  }, [searchInput]);

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="주소를 입력하세요"
      />
      {isSearching && <p>검색 중...</p>}

      {/* 검색 결과 목록 */}
      {addresses.length > 0 && (
        <ul>
          {addresses.map((address, index) => (
            <li key={index}>
              {address.place_name} - {address.address_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
