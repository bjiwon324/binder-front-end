import { searchDetailList, searchPrev } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import SearchDetail from "../SearchDetail";
import SearchItem from "../SearchItem";
import styles from "./SearchItem.module.scss";

const cn = classNames.bind(styles);

export default function SearchItems() {
  const [prevSearch] = useAtom(searchPrev);
  const [detail, a] = useAtom(searchDetailList);

  return (
    <div className={cn("itemsWrap")}>
      {/* <div onClick={() => a([])}>sdf</div> */}
      {detail.length > 0
        ? detail?.map((item: any, index: number) => (
            <div key={index}>
              <SearchDetail item={item} />
            </div>
          ))
        : prevSearch?.map((item: any, index: number) => (
            <div key={index}>
              <SearchItem item={item} num={index} />
            </div>
          ))}
    </div>
  );
}
