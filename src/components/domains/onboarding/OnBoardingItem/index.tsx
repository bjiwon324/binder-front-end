import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./OnBoardingItem.module.scss";

const cn = classNames.bind(styles);

interface OnBoardingItem {
  title: string;
  subTitle?: string;
  imgs: any;
  next: () => void;
}

export default function OnBoardingItem({
  title,
  subTitle = " ",
  imgs,
  next,
}: OnBoardingItem) {
  return (
    <div className={cn("wrap")}>
      <div className={cn("titleWrap")}>
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </div>
      {title !== "위치 동의 받고 빠르게 안내 받아보세요" ? (
        <Image src={imgs} alt="온보딩 이미지" width={200} height={427} />
      ) : (
        <Image src={imgs} alt="온보딩 이미지" width={270} height={427} />
      )}

      <div className={cn("nextBtn")} onClick={next}>
        다음
      </div>
    </div>
  );
}
