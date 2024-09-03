import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropProfileEdit.module.scss";
import Image from "next/image";
import defaultImg from "@/../public/images/profileDefault.svg";
import profileEdit from "@/../public/images/profileEdit.svg";

const cn = classNames.bind(styles);

interface IFormInput {
  profileImg: string;
  nickname: string;
}

interface EditProfileProps {
  closeBtn: () => void;
}

export default function DropProfileEdit({ closeBtn }: EditProfileProps) {
  const [submit, setSubmit] = useState<boolean>(false);
  const [submitNick, setSubmitNick] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const profileImg = useWatch({
    control,
    name: "profileImg",
    defaultValue: "",
  });

  const nickname = useWatch({
    control,
    name: "nickname",
    defaultValue: "",
  });
  useEffect(() => {
    setSubmit(
      profileImg.length > 0 || (nickname !== "" && nickname.length > 1)
    );
    setSubmitNick(nickname.length > 1);
  }, [profileImg, nickname]);

  return (
    <DropWrap
      title="프로필 수정"
      btn="적용"
      closeBtn={closeBtn}
      btnFunction={handleSubmit(onSubmit)}
      submitState={submit}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={cn("profiltEditWrap")}>
        <label htmlFor="profileImg" className={cn("imgEditWrap")}>
          <div className={cn("profileImg")}>
            <Image src={defaultImg} alt="프로필 이미지" fill />
          </div>
          <div className={cn("profileEdit")}>
            <div className={cn("profileEditimg")}>
              <Image src={profileEdit} alt="프로필 편집 이미지" fill />
            </div>
          </div>
        </label>
        <input
          className={cn("profile")}
          id="profileImg"
          type="file"
          accept="image/*"
          {...register("profileImg")}
        />

        <div className={cn("nicknameWrap")}>
          <div className={cn("nicknameTitle")}>
            <label
              htmlFor="nickname"
              className={
                errors.nickname
                  ? cn("nicknameRed")
                  : submitNick
                    ? cn("nicknameGreen")
                    : cn("nickname")
              }
            >
              닉네임
            </label>
            {errors.nickname ? (
              <div className={cn("nicknameNotiRed")}>
                {errors.nickname.message}
              </div>
            ) : (
              <div className={cn("nicknameNoti")}>{nickname.length} / 10자</div>
            )}
          </div>
          <input
            className={
              errors.nickname
                ? cn("nicknameInputRed")
                : submitNick
                  ? cn("nicknameInputGreen")
                  : cn("nicknameInput")
            }
            id="nickname"
            type="text"
            maxLength={10}
            {...register("nickname", {
              minLength: {
                value: 2,
                message: "닉네임은 최소 2자 이상이어야 합니다.",
              },
              maxLength: 10,
              pattern: {
                value: /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/,
                message: "특수문자는 사용할 수 없습니다.",
              },
            })}
            placeholder="한글, 영어, 숫자만 사용가능 (2자 이상)"
          />
        </div>
      </form>
    </DropWrap>
  );
}
DropProfileEdit.defaultProps = {};
