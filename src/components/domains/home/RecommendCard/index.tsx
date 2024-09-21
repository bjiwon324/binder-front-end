import { getBinsId } from "@/lib/apis/bins";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./RecommendCard.module.scss";

const cn = classNames.bind(styles);

interface Props {
  binDataId: string;
  distance: number;
}

export default function RecommendCard({ binDataId, distance }: Props) {
  const { data: binDetailData, isLoading } = useQuery({
    queryKey: ["bindetail", binDataId],
    queryFn: () => getBinsId(binDataId),
    enabled: !!binDataId,
  });
  console.log("detail", binDetailData);

  if (isLoading) {
    return;
  }

  return (
    <button className={cn("card-wrapper")}>
      <div className={cn("text-box")}>
        <span className={cn("recommend")}>추천</span>
        <p className={cn("card-title")}>
          {binDetailData.title}
          <span></span>
        </p>
        <div className={cn("address-box")}>
          <Image
            alt="위치 표시 핀"
            src={"/images/icon-location-green-pin.svg"}
            width={14}
            height={17}
          />
          <p>{binDetailData.address}</p>
        </div>
        <div className={cn("likes-box")}>
          <Image
            src={"/images/icon-gray-star.svg"}
            className={cn("star")}
            alt="즐겨찾기 갯수"
            width={14}
            height={14}
          />
          <p>{binDetailData.bookmarkCount}</p>
          <Image
            src={"/images/thumb-up.svg"}
            alt="좋아요 갯수"
            width={17}
            height={14}
          />
          <p>{binDetailData.likeCount}</p>
          <Image
            src={"/images/thumb-down.svg"}
            alt="싫어요 갯수"
            width={17}
            height={14}
          />
          <p>{binDetailData.dislikeCount}</p>
        </div>
      </div>
      <div className={cn("img-box")}>
        {binDetailData.imageUrl && (
          <Image
            src={binDetailData.imageUrl}
            alt="쓰레기통 이미지"
            width={115}
            height={95}
          />
        )}
        <p className={cn("img-box-text")}>
          <Image
            src={"/images/icon-location-green-pin.svg"}
            alt="위치 표시 핀"
            width={11}
            height={14}
          />
          {Math.floor(distance) + "m"}
        </p>
      </div>
    </button>
  );
}
