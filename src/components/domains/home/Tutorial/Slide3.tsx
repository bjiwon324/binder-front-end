import bobble from "@/../public/images/bobble.svg";
import tutorialPin from "@/../public/images/tutorialPin.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./tutorial.module.scss";

const cn = classNames.bind(styles);

export default function Slide3() {
  return (
    <div className={cn("slide3")}>
      <Image src={tutorialPin} alt={"튜토리얼3 핀"} width={300} height={300} />

      <div className={cn("bubble")}>
        <Image src={bobble} alt={"말풍선 삼각형"} width={22} height={14} />
        <div className={cn("bubbleText")}>쓰레기통 위치를 검색하세요</div>
      </div>
    </div>
  );
}
