import tutorial1 from "@/../public/images/tutorial1.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./tutorial.module.scss";

const cn = classNames.bind(styles);

export default function Slide1() {
  return (
    <div className={cn("slide1")}>
      <Image src={tutorial1} alt={"튜토리얼 이미지"} width={121} height={121} />
      <p>쓰레기통을 찾는 3가지 방법</p>
    </div>
  );
}
