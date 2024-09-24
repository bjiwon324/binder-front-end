import SearchInput from "@/components/domains/search/SearchInput";
import SearchItems from "@/components/domains/search/SearchItems";
import SearchToggle from "@/components/domains/search/SearchToggle";
import { searchDetailList } from "@/lib/atoms/atom";
import { useAtom } from "jotai";

export default function Search() {
  const [detail, setDetail] = useAtom(searchDetailList);
  return (
    <>
      <SearchInput />
      {detail.length === 0 && <SearchToggle />}
      <SearchItems />
    </>
  );
}
