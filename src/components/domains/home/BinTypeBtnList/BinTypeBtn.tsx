import { BinItemType } from "@/lib/constants/btnInputValues";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./BinTypeBtnList.module.scss";

const cn = classNames.bind(styles);

interface Props {
  type?: BinItemType;
  binType: null | BinItemType["id"];
  isBookMarked: boolean;
  onClick: (id?: BinItemType["id"]) => void;
}

export default function BinTypeBtn({
  isBookMarked,
  binType,
  type,
  onClick,
}: Props) {
  const getBinImage = (binType?: string) => {
    switch (binType) {
      case "GENERAL":
        return "/images/general-bin.svg";
      case "RECYCLE":
        return "/images/recyle-bin.svg";
      case "BEVERAGE":
        return "/images/drink-bin.svg";
      case "CIGAR":
        return "/images/tabacoo-bin.svg";
      default:
        return "/images/general-bin.svg";
    }
  };
  return (
    <button
      className={cn(
        "bin-type-btn",
        // isBookMarked && "selected",
        binType === type?.id && "selected"
      )}
      onClick={() => onClick(type?.id)}
    >
      <Image
        src={isBookMarked ? "/images/favorite-bin.svg" : getBinImage(type?.id)}
        alt={isBookMarked ? "저장한 장소 이미지" : `${type?.label} 이미지`}
        width={24.5}
        height={25}
      />
      <p>{isBookMarked ? "저장한 장소" : type?.label}</p>
    </button>
  );
}
