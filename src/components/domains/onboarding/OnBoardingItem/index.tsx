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

// 이미지 크기를 계산하는 함수
const getImageSize = (title: string) => {
  if (title === "근처 쓰레기통을 찾아보세요") {
    return { width: 200, height: 427 };
  } else if (title === "위치 동의 받고 빠르게 안내 받아보세요") {
    return { width: 270, height: 427 };
  } else {
    return { width: 140, height: 427 };
  }
};

export default function OnBoardingItem({
  title,
  subTitle,
  imgs,
  next,
}: OnBoardingItem) {
  const imageSize = getImageSize(title); // 이미지 사이즈 가져오기

  return (
    <div className={cn("wrap")}>
      <div className={cn("titleWrap")}>
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </div>
      <Image
        src={imgs}
        alt="온보딩 이미지"
        width={imageSize.width}
        height={imageSize.height}
      />
      <div className={cn("nextBtn")} onClick={next}>
        다음
      </div>
    </div>
  );
}
