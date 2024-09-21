import SocialoginButton from "@/components/domains/signin/SocialoginButton";
import { SOCIAL_LOGIN_URL } from "@/lib/constants/urls";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./signin.module.scss";
import LoginToast from "@/components/domains/signin/LoginToast";

const cn = classNames.bind(styles);

export default function Signin() {
  const handleClickKakaoSignIn = () => {
    window.location.href = SOCIAL_LOGIN_URL + "/kakao";
  };

  const handleClickNaverSignIn = () => {
    window.location.href = SOCIAL_LOGIN_URL + "/naver";
  };

  const handleClickGoogleSignIn = () => {
    window.location.href = SOCIAL_LOGIN_URL + "/google";
  };

  return (
    <section className={cn("wrapper")}>
      <div>
        <article className={cn("title-box")}>
          <Image
            alt="logo"
            src={"/images/icon-sample-logo.svg"}
            objectFit="fit"
            width={120}
            height={39}
          />
          <p className={cn("description")}>로그인 후 이용가능합니다.</p>
        </article>
        <article className={cn("btns-wrapper")}>
          <LoginToast />
          <SocialoginButton
            label="kakao"
            onClick={handleClickKakaoSignIn}
            testId={"kakaoBtn"}
          />
          <SocialoginButton
            label="naver"
            onClick={handleClickNaverSignIn}
            testId={"naverBtn"}
          />
          <SocialoginButton
            label="google"
            onClick={handleClickGoogleSignIn}
            testId={"googleBtn"}
          />
        </article>
      </div>
    </section>
  );
}
