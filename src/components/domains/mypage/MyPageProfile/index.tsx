import classNames from "classnames/bind";
import styles from "./MyPageProfile.module.scss";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEditImg from "@/../public/images/profileEdit.svg";
import star from "@/../public/images/star.svg";
import Image from "next/image";
import DropProfileEdit from "@/components/commons/DropBottom/DropProfileEdit";
import { useState } from "react";

const cn = classNames.bind(styles);

interface ProfileProps {
  memberData: {
    id: number;
    createdAt: string;
    modifiedAt: string;
    email: string;
    nickname: string;
    role: string;
    image_url: string;
  };
}

export default function MyPageProfile({ memberData }: ProfileProps) {
  const [profileEdit, setProfileEdit] = useState<boolean>(false);

  const handleProfileEdit = () => {
    setProfileEdit((prev) => !prev);
  };

  const profileImg =
    memberData.image_url !== null ? memberData.image_url : defaultImg;

  return (
    <>
      <div className={cn("profileWrap")}>
        <div className={cn("imgEditWrap")} onClick={handleProfileEdit}>
          <div className={cn("profileImg")}>
            <Image src={profileImg} alt="프로필 이미지" fill />
          </div>
          <div className={cn("profileEdit")}>
            <div className={cn("profileEditimg")}>
              <Image src={profileEditImg} alt="프로필 편집 이미지" fill />
            </div>
          </div>
        </div>

        <div className={cn("profileName")}>{memberData.nickname}</div>

        <div className={cn("profileStar")}>
          <div className={cn("profileStarImg")}>
            <Image src={star} alt="별점" fill sizes="15px" />
          </div>
          21
        </div>
      </div>

      {profileEdit && (
        <DropProfileEdit closeBtn={handleProfileEdit} memberData={memberData} />
      )}
    </>
  );
}
