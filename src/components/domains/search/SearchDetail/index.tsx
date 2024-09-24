import bookmark from "@/../public/images/bookmark.svg";
import bookmarkOn from "@/../public/images/bookmarkOn.svg";
import { deleteMyBookmark, postMyBookmark } from "@/lib/apis/bookmarks";
import { binType } from "@/lib/constants/binType";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./SearchDetail.module.scss";

const cn = classNames.bind(styles);

interface DetailProp {
  item: {
    id: number;
    address: string;
    title: string;
    type: string;
    longitude: number;
    latitude: number;
    isBookMarked: boolean;
    distance: number;
  };
}

export default function SearchDetail({ item }: DetailProp) {
  const distances = Math.floor(item.distance).toLocaleString();
  const bin = binType(item.type);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const { mutate: handlePost } = useMutation({
    mutationFn: () => postMyBookmark(item.id),
  });
  const { mutate: handleDelete } = useMutation({
    mutationFn: () => deleteMyBookmark(item.id),
  });

  const handleBookmark = () => {
    if (isBookmark) {
      handleDelete;
      setIsBookmark(false);
    } else {
      handlePost;
      setIsBookmark(true);
    }
  };

  return (
    <div className={cn("detailWrap")}>
      <Image
        src={item.isBookMarked ? bookmarkOn : bookmark}
        alt={"북마크 이미지"}
        width={16}
        height={19}
        onClick={handleBookmark}
      />

      <div className={cn("detailMain")}>
        <p className={cn("detailTitle")}>{item.title}</p>
        <p className={cn("detailAddress")}>{item.address}</p>
      </div>

      <div className={cn("detailSub")}>
        <p className={cn("detailDistance")}>{distances}m</p>
        <p className={cn("detailTag")}>{bin}</p>
      </div>
    </div>
  );
}
