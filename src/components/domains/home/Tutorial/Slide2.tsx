import bobble from "@/../public/images/bobble.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import SearchBtn from "../KakaoMap/SearchBtn";
import styles from "./tutorial.module.scss";

const cn = classNames.bind(styles);

export default function Slide2() {
  return (
    <div className={cn("slide2")}>
      <div className={cn("btnWrap")}>
        <SearchBtn />
      </div>
      <div className={cn("bubble")}>
        <Image src={bobble} alt={"말풍선 삼각형"} width={22} height={14} />
        <div className={cn("bubbleText")}>쓰레기통 위치를 검색하세요</div>
      </div>
    </div>
  );
}
