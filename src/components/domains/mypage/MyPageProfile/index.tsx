import adminMark from "@/../public/images/adminMark.svg";
import noti from "@/../public/images/noti.svg";
import notiOn from "@/../public/images/notiOn.svg";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEditImg from "@/../public/images/profileEdit.svg";
import star from "@/../public/images/star.svg";
import DropProfileEdit from "@/components/commons/DropBottom/DropProfileEdit";
import { notiAtom, userImg } from "@/lib/atoms/userAtom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import MyPageNoti from "../MyPageNoti";
import styles from "./MyPageProfile.module.scss";

const cn = classNames.bind(styles);

interface ProfileProps {
  memberData: {
    id: number;
    createdAt: string;
    modifiedAt: string;
    email: string;
    nickname: string;
    role: string;
    imageUrl: string;
    bookmarkCount: number;
  };
}

export default function MyPageProfile({ memberData }: ProfileProps) {
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  const [notiModal, setNotiModal] = useState<boolean>(false);
  const [nick, setNick] = useState<string>(memberData?.nickname);
  const [img, setImg] = useState<string>(memberData?.imageUrl);
  const [isNoti] = useAtom(notiAtom);
  const [image, setImage] = useAtom(userImg);

  const handleProfileEdit = () => {
    setProfileEdit((prev) => !prev);
  };
  const handleNoti = () => {
    setNotiModal((prev) => !prev);
  };
  useEffect(() => {
    setImage(img || defaultImg);
  }, [img]);

  return (
    <>
      <article className={cn("profileWrap")}>
        <figure className={cn("imgEditWrap")} onClick={handleProfileEdit}>
          <div className={cn("profileImg")}>
            {image && (
              <Image
                src={image}
                alt="프로필 이미지"
                width={86}
                height={86}
                // layout="intrinsic"
                priority
              />
            )}
          </div>
          <div className={cn("profileEdit")}>
            <div className={cn("profileEditimg")}>
              <Image
                src={profileEditImg}
                alt="프로필 편집 이미지"
                width={19}
                height={19}
              />
            </div>
          </div>
        </figure>

        <div className={cn("profileName")}>
          {nick?.slice(0, 16)}
          {memberData?.role === "ROLE_ADMIN" && (
            <Image
              src={adminMark}
              alt="어드민 인증마크"
              width={17}
              height={17}
            />
          )}
        </div>

        <div className={cn("profileStar")}>
          <div className={cn("profileStarImg")}>
            <Image src={star} alt="별점" fill sizes="15px" />
          </div>
          {memberData?.bookmarkCount}
        </div>

        <Image
          className={isNoti ? cn("profileNotiOn") : cn("profileNoti")}
          src={isNoti ? notiOn : noti}
          alt="알림이미지"
          width={31}
          height={30}
          onClick={handleNoti}
        />
      </article>

      {profileEdit && (
        <DropProfileEdit
          closeBtn={handleProfileEdit}
          memberData={memberData}
          setNick={setNick}
          nick={nick}
          setImg={setImg}
        />
      )}
      {notiModal && <MyPageNoti closeBtn={handleNoti} />}
    </>
  );
}
