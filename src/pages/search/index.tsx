import SearchInput from "@/components/domains/search/SearchInput";
import SearchItems from "@/components/domains/search/SearchItems";
import SearchToggle from "@/components/domains/search/SearchToggle";
import { searchDetailList, searchToggle } from "@/lib/atoms/atom";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [detail, setDetail] = useAtom(searchDetailList);
  const [prevSearchPick, setPrevSearchPick] = useState<string>("");
  const target = useRef<HTMLDivElement>(null);
  const [btnState] = useAtom(searchToggle);
  useEffect(() => {
    setDetail(null);
  }, []);

  return (
    <>
      <SearchInput prevSearchPick={prevSearchPick} />
      <SearchToggle target={target} />

      <SearchItems setPrevSearchPick={setPrevSearchPick} target={target} />

      <div
        ref={target}
        style={{
          height: "1px",
          marginTop: "-5rem",
          display: btnState === "저장한 장소" ? "block" : "none",
        }}
      ></div>
    </>
  );
}
