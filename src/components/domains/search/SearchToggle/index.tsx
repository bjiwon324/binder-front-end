import BookmarkNoti from "@/components/commons/Modal/Share/BookmarkNoti";
import { getMyBookmark } from "@/lib/apis/bookmarks";
import {
  searchBookmark,
  searchDetailList,
  searchToggle,
} from "@/lib/atoms/atom";
import { loginState, userCoordinate } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import styles from "./SearchToggle.module.scss";

const cn = classNames.bind(styles);

export default function SearchToggle() {
  const [btnState, setBtnState] = useAtom(searchToggle);
  const [coordinate] = useAtom(userCoordinate);
  const [login] = useAtom(loginState);
  const [, setSearch] = useAtom(searchBookmark);
  const [loginplzModal, setLoginplzModal] = useState<boolean>(false);
  const [detail, setDetail] = useAtom(searchDetailList);

  const { data: bookmarkData, isSuccess } = useQuery({
    queryKey: ["bookmarkDatas", btnState],
    queryFn: () => getMyBookmark(coordinate.x, coordinate.y),
    enabled: !!coordinate,
  });

  if (isSuccess) {
    setSearch(bookmarkData);
  }
  useEffect(() => {
    if (btnState === "저장한 장소" && login === false) {
      setLoginplzModal(true);

      setTimeout(() => {
        setLoginplzModal(false);
      }, 3000);
    }
  }, [btnState, login]);

  useEffect(() => {
    if (detail?.length > 0) {
      setBtnState("");
    } else if (btnState === "최근 검색") {
      setBtnState("최근 검색");
    } else if (btnState === "저장한 장소") {
      setBtnState("저장한 장소");
    }
  }, [detail]);

  useEffect(() => {
    if (btnState === "최근 검색" || btnState === "저장한 장소") {
      setDetail(null);
    }
  }, [btnState]);

  const onClickRecentSearch = (text: string) => {
    setDetail(null);
    setBtnState(text);
  };
  return (
    <>
      <div className={cn("toggleWrap")}>
        <div
          className={
            btnState === "최근 검색" ? cn("toggleBtnOn") : cn("toggleBtn")
          }
          onClick={() => onClickRecentSearch("최근 검색")}
        >
          최근 검색
        </div>
        <div
          className={
            btnState === "저장한 장소" ? cn("toggleBtnOn") : cn("toggleBtn")
          }
          onClick={() => onClickRecentSearch("저장한 장소")}
        >
          저장한 장소
        </div>
      </div>
      {loginplzModal && <BookmarkNoti />}
    </>
  );
}
