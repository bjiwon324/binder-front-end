import bobble from "@/../public/images/bobble.svg";
import tutorialItem from "@/../public/images/tutorialItem.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./tutorial.module.scss";

const cn = classNames.bind(styles);

export default function Slide4() {
  return (
    <div className={cn("slide4")}>
      <div className={cn("bubble")}>
        <div className={cn("bubbleText")}>쓰레기통 위치를 검색하세요</div>
        <Image src={bobble} alt={"말풍선 삼각형"} width={22} height={14} />
      </div>

      <Image
        src={tutorialItem}
        alt={"튜토리얼4 이미지"}
        width={356}
        height={141}
      />
    </div>
  );
}
