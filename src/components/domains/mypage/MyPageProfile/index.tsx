import classNames from "classnames/bind";
import styles from "./MyPageProfile.module.scss";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEditImg from "@/../public/images/profileEdit.svg";
import star from "@/../public/images/star.svg";
import Image from "next/image";
import DropProfileEdit from "@/components/commons/DropBottom/DropProfileEdit";
import { useState } from "react";

const cn = classNames.bind(styles);

export default function MyPageProfile() {
  const [profileEdit, setProfileEdit] = useState<boolean>(false);

  const handleProfileEdit = () => {
    setProfileEdit((prev) => !prev);
  };

  return (
    <>
      <div className={cn("profileWrap")}>
        <div className={cn("imgEditWrap")} onClick={handleProfileEdit}>
          <div className={cn("profileImg")}>
            <Image src={defaultImg} alt="프로필 이미지" fill />
          </div>
          <div className={cn("profileEdit")}>
            <div className={cn("profileEditimg")}>
              <Image src={profileEditImg} alt="프로필 편집 이미지" fill />
            </div>
          </div>
        </div>

        <div className={cn("profileName")}>영등포미화꾼</div>

        <div className={cn("profileStar")}>
          <div className={cn("profileStarImg")}>
            <Image src={star} alt="별점" fill sizes="15px" />
          </div>
          21
        </div>
      </div>

      {profileEdit && <DropProfileEdit closeBtn={handleProfileEdit} />}
    </>
  );
}
