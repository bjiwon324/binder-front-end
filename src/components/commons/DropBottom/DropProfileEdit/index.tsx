import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import DropWrap from "..";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DropProfileEdit.module.scss";
import Nickname from "./Nickname";
import Img from "./Img";

const cn = classNames.bind(styles);

interface IFormInput {
  profileImg: any;
  nickname: string;
}

interface EditProfileProps {
  closeBtn: () => void;
  memberData: any;
}

export default function DropProfileEdit({
  closeBtn,
  memberData,
}: EditProfileProps) {
  const [submit, setSubmit] = useState<boolean>(false);
  const [submitNick, setSubmitNick] = useState<boolean>(false);
  const [imgData, setImgData] = useState<any>(memberData.image_url);
  const prevNickname = memberData.nickname.slice(0, 10);

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
        <Img
          register={register("profileImg")}
          imgData={imgData}
          setImgData={setImgData}
          profileImg={profileImg}
        />

        {/* 닉네임  */}
        <Nickname
          errors={errors}
          register={{
            ...register("nickname", {
              minLength: {
                value: 2,
                message: "닉네임은 최소 2자 이상이어야 합니다.",
              },
              maxLength: 10,
              pattern: {
                value: /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/,
                message: "특수문자는 사용할 수 없습니다.",
              },
            }),
          }}
          submitNick={submitNick}
          prevNickname={prevNickname}
          nickname={nickname}
        />
      </form>
    </DropWrap>
  );
}
DropProfileEdit.defaultProps = {};
