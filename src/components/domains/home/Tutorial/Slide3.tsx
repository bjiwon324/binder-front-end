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
      <button className={cn("searchBtn")}>
        <Image
          src={"/images/return.svg"}
          alt="현위치에서 다시 검색하기"
          width={21}
          height={20}
        />
        <p>현 위치에서 검색</p>
      </button>
      <div className={cn("bubble")}>
        <Image src={bobble} alt={"말풍선 삼각형"} width={22} height={14} />
        <div className={cn("bubbleText")}>
          현 위치에서 검색으로
          <br />
          주변 아이콘을 찾아보세요
        </div>
      </div>
    </div>
  );
}
